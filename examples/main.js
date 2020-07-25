import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/color-brewer.css'
import './assets/styles/index.styl'
import BinUI from 'bin-ui'
import 'bin-ui/lib/styles/index.css'

import Editor from 'bin-ace-editor'

// 按需引入需要的语言包皮肤等资源
require('brace/ext/emmet') // 如果是lang=html时需引入
require('brace/ext/language_tools') // language extension

require('brace/mode/json')
require('brace/snippets/json')
require('brace/theme/chrome')

// 文档组件引入
import DemoBlock from './components/demo-block.vue'
import MainHeader from './components/header.vue'
import MainFooter from './components/footer.vue'
import SideNav from './components/side-nav.vue'

// 当前组件的引入
import VueComponent from '../src/index'
import '../src/styles/index.styl'

// 按需加载
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

Vue.use(BinUI)
// 当前的组件
Vue.use(VueComponent)
// 注册editor
Vue.component(Editor.name, Editor)

Vue.component('DemoBlock', DemoBlock)
Vue.component('MainHeader', MainHeader)
Vue.component('MainFooter', MainFooter)
Vue.component('SideNav', SideNav)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
