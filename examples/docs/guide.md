## 介绍

仿照vue-echarts组件进行echarts的包裹，主要用于解决默认主题问题及响应options配置，并提供若干封装函数用于转换函数

## 安装

### CDN 安装

通过[unpkg.com/bin-charts](https://unpkg.com/bin-charts/) 可以看到 bin-charts
最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 文件即可开始使用：

```
<!-- import Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- import echarts -->
<script src="https://cdn.jsdelivr.net/npm/echarts@4.1.0/dist/echarts.js"></script>
<!-- import bin-charts -->
<script src="https://unpkg.com/bin-charts@0.1.0/lib/bin-charts.min.js"></script>
```
    
`@0.1.0` 表示版本号，我们建议锁定版本号来保证代码的稳定性

### npm 安装

推荐使用npm安装，它能更好地和[webpack](https://webpack.js.org/)打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
npm i bin-charts -S
# or 
yarn add bin-charts
```

如果您了解node.js、npm安装，并希望配合webpack使用，请阅读下一节：[快速上手](/#/start)。

## 使用方法

用 npm 与 Vue Loader 基于 ES Module 引入（推荐用法）, 具体使用方法见 demo

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import BinCharts from 'bin-charts';
import App from './App.vue';

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl'

// 注册组件后即可使用
Vue.component(BinCharts.name, BinCharts)

new Vue({
  el: '#app',
  render: h => h(App)
});
```

**注意事项**

在webpack模式下，默认会引入源码版本来实现按需加载，可能会遇到默认配置把 node_modules 中的文件排除在
Babel 转译范围以外的问题。请按如下方法修改配置：

```javascript
// vue.config.js
module.exports = {
  transpileDependencies: [
    'bin-charts'
  ]
}
```
