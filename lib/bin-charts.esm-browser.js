/*!
  * bin-charts v3.1.0
  * (c) 2021 wangbin
  * @license MIT
  */
import { ref, onMounted, onBeforeUnmount, watch, openBlock, createBlock } from 'vue';
import * as echarts from 'echarts';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * 节流函数，(限制函数的执行频率)返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param immediate 是否立即执行 true 则先调用，false不先调用
 * @return {function}             返回客户调用函数
 */
function throttle(func, wait, immediate) {
  var timeoutID;
  var lastExec = 0;

  function wrapper() {
    var self = this;
    var elapsed = Number(new Date()) - lastExec;
    var args = arguments;

    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    }

    function clear() {
      timeoutID = undefined;
    }

    function exec() {
      lastExec = Number(new Date());
      func.apply(self, args);
    }

    if (immediate && !timeoutID) {
      exec();
    }

    clearExistingTimeout();

    if (immediate === undefined && elapsed > wait) {
      exec();
    } else {
      timeoutID = setTimeout(immediate ? clear : exec, immediate === undefined ? wait - elapsed : wait);
    }
  }

  return wrapper;
}
/**
 * 防抖函数，(限制函数的执行频率) 保证再一系列调用时间内，只调用一次
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @return {function}             返回客户调用函数
 */

function debounce(func, wait) {
  return throttle(func, wait, false);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var isServer = typeof window === 'undefined';
/* istanbul ignore next */

var resizeHandler = function resizeHandler(entries) {
  for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
    var entry = _step.value;
    var listeners = entry.target.__resizeListeners__ || [];

    if (listeners.length) {
      listeners.forEach(function (fn) {
        fn();
      });
    }
  }
};
/* istanbul ignore next */


var addResizeListener = function addResizeListener(element, fn) {
  if (isServer || !element) return;

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);

    element.__ro__.observe(element);
  }

  element.__resizeListeners__.push(fn);
};
/* istanbul ignore next */

var removeResizeListener = function removeResizeListener(element, fn) {
  if (!element || !element.__resizeListeners__) return;

  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);

  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};

var script = {
  name: 'BCharts',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    wrapStyle: function wrapStyle() {
      return {
        width: this.width,
        height: this.height
      };
    }
  },
  setup: function setup(props) {
    var elRef = ref(null);
    var chartInstance = null;
    var __resizeHandler = null;
    onMounted(function () {
      init();
      __resizeHandler = debounce(resize, 100);
      addResizeListener(elRef.value, __resizeHandler);
    });
    onBeforeUnmount(function () {
      removeResizeListener(elRef.value, __resizeHandler);
      if (!chartInstance) return;
      chartInstance.dispose();
      chartInstance = null;
    });
    watch(function () {
      return props.options;
    }, function (val) {
      setOptions(val);
    }, {
      deep: true
    });

    function init() {
      if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
      }

      chartInstance = echarts.init(elRef.value);
      setOptions(props.options);
    }

    function resize() {
      if (chartInstance) {
        chartInstance.resize();
      }
    }

    function setOptions(opts) {
      if (chartInstance) {
        chartInstance.setOption(opts);
      }
    }

    function clear() {
      if (chartInstance) {
        chartInstance.clear();
      }
    }

    function refresh() {
      clear();
      setOptions(props.options);
    } // 触发事件


    function dispatchAction(obj) {
      if (chartInstance) {
        chartInstance.dispatchAction(obj);
      }
    }

    function showLoading(opts) {
      if (chartInstance) {
        chartInstance.showLoading(opts);
      }
    }

    function hideLoading() {
      if (chartInstance) {
        chartInstance.hideLoading();
      }
    }

    function getInstance() {
      return chartInstance;
    }

    return {
      elRef: elRef,
      resize: resize,
      init: init,
      getInstance: getInstance,
      refresh: refresh,
      clear: clear,
      setOptions: setOptions,
      dispatchAction: dispatchAction,
      showLoading: showLoading,
      hideLoading: hideLoading
    };
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    class: "bin-charts",
    ref: "elRef",
    style: $options.wrapStyle
  }, null, 4
  /* STYLE */
  );
}

script.render = render;
script.__file = "src/components/charts/charts.vue";

/* istanbul ignore next */

script.install = function (Vue) {
  Vue.component(script.name, script);
};

var log = {};
/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */

function typeColor(type) {
  if (type === void 0) {
    type = 'default';
  }

  var color = '';

  switch (type) {
    case 'primary':
      color = '#0d85ff';
      break;

    case 'success':
      color = '#52c41a';
      break;

    case 'warning':
      color = '#fea638';
      break;

    case 'danger':
      color = '#ff4d4f';
      break;

    case 'default':
      color = '#35495E';
      break;

    default:
      color = type;
      break;
  }

  return color;
} // 漂亮的

log.pretty = function (title, text, type) {
  if (type === void 0) {
    type = 'primary';
  }

  console.log("%c " + title + " %c " + text + " %c", "background:" + typeColor(type) + ";border:1px solid " + typeColor(type) + "; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;", "border:1px solid " + typeColor(type) + "; padding: 1px; border-radius: 0 2px 2px 0; color: " + typeColor(type) + ";", 'background:transparent');
};

var name = "bin-charts";
var description = "基于echarts的 vue插件，用于配合实现图表组件";
var version$1 = "3.1.0";
var keywords = [
	"bin-charts",
	"vue3",
	"components"
];
var author = "wangbin";
var files = [
	"lib",
	"src"
];
var main = "lib/index.common.js";
var module = "src/components/charts/charts.vue";
var unpkg = "lib/index.global.js";
var homepage = "https://wangbin3162.gitee.io/bin-charts/";
var license = "MIT";
var scripts = {
	dev: "webpack-dev-server --config build/webpack.dev.js",
	"build:demo": "rimraf docs && cross-env NODE_ENV=production webpack --config build/webpack.dev.js",
	build: "yarn clean-lib && yarn build:lib",
	"clean-lib": "rimraf lib",
	"build:lib": "rollup --config ./build/rollup.config.js",
	lint: "eslint ./src --ext .vue,.js,.ts",
	"lint-fix": "eslint --fix ./src --ext .vue,.js,.ts"
};
var peerDependencies = {
	echarts: "^5.1.2",
	"resize-observer-polyfill": "^1.5.1",
	vue: "^3.0.5"
};
var devDependencies = {
	"@babel/core": "^7.11.4",
	"@babel/plugin-transform-runtime": "^7.14.5",
	"@babel/polyfill": "^7.12.1",
	"@babel/preset-env": "^7.11.5",
	"@rollup/plugin-babel": "^5.2.2",
	"@rollup/plugin-commonjs": "^15.1.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^9.0.0",
	"@rollup/plugin-replace": "^2.3.4",
	"@vue/babel-plugin-jsx": "^1.0.0",
	"@vue/compiler-sfc": "^3.0.5",
	"babel-eslint": "^10.1.0",
	"babel-loader": "^8.2.2",
	"babel-plugin-transform-class-properties": "^6.24.1",
	"bin-ace-editor": "^3.1.1",
	"bin-ui-next": "^0.8.10",
	"cross-env": "^7.0.2",
	"css-loader": "^4.2.2",
	"css-minimizer-webpack-plugin": "^1.1.5",
	echarts: "^5.1.2",
	eslint: "^7.7.0",
	"eslint-plugin-vue": "^7.5.0",
	"file-loader": "^6.0.0",
	"file-save": "^0.2.0",
	gulp: "^4.0.2",
	"gulp-autoprefixer": "^7.0.1",
	"gulp-cssmin": "^0.2.0",
	"gulp-stylus": "^2.7.0",
	"highlight.js": "^11.0.1",
	"html-webpack-plugin": "^4.3.0",
	"markdown-it": "^12.0.4",
	"markdown-it-anchor": "^7.0.0",
	"markdown-it-chain": "^1.3.0",
	"markdown-it-container": "^3.0.0",
	"mini-css-extract-plugin": "^0.11.2",
	prettier: "^1.19.1",
	rimraf: "^3.0.2",
	rollup: "^2.28.2",
	"rollup-plugin-css-only": "^2.1.0",
	"rollup-plugin-peer-deps-external": "^2.2.4",
	"rollup-plugin-stylus": "^1.0.4",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-vue": "^6.0.0-beta.11",
	"style-loader": "^1.2.1",
	stylus: "^0.54.8",
	"stylus-loader": "3.0.2",
	tinycolor2: "^1.4.2",
	transliteration: "^2.2.0",
	"url-loader": "^4.1.1",
	vue: "^3.0.5",
	"vue-loader": "^16.1.2",
	"vue-router": "^4.0.2",
	"vue-template-compiler": "^2.6.12",
	webpack: "^4.44.1",
	"webpack-bundle-analyzer": "^3.9.0",
	"webpack-cli": "^3.3.12",
	"webpack-dev-server": "^3.11.0"
};
var config = {
	name: name,
	description: description,
	version: version$1,
	keywords: keywords,
	author: author,
	files: files,
	main: main,
	module: module,
	unpkg: unpkg,
	homepage: homepage,
	"private": false,
	license: license,
	scripts: scripts,
	peerDependencies: peerDependencies,
	devDependencies: devDependencies
};

var version = config.version; // version_ to fix tsc issue

var install = function install(app, options) {
  if (options === void 0) {
    options = {};
  }

  app.component(script.name, script);

  if (!options.disabledDoc) {
    log.pretty("[" + config.name + "] " + config.version, config.homepage);
  }

  return app;
};
var index = {
  version: version,
  install: install
};

export default index;
export { script as Charts };
