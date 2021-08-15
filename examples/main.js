import '@babel/polyfill'
import { createApp } from 'vue'
import router from './route'
import App from './App.vue'
import BinUI from 'bin-ui-next'
import 'bin-ui-next/lib/styles/normalize.css'
import 'bin-ui-next/lib/styles/index.css'
import './assets/styles/index.styl'

import DemoBlock from './components/demo-block.vue'
import MainFooter from './components/footer.vue'
import MainHeader from './components/header.vue'
import SideNav from './components/side-nav.vue'
// 自定义组件库内容

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 当前组件的引入
import Charts from '../src/components/charts'
import Editor from 'bin-ace-editor'

import 'brace/ext/emmet'
import 'brace/ext/language_tools'
import 'brace/mode/json'
import 'brace/snippets/json'
import 'brace/theme/chrome'
// 注册必须的组件
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
])

const app = createApp(App)
app.use(BinUI, { disabledDoc: true })
app.config.productionTip = false

app.component('DemoBlock', DemoBlock)
app.component('MainHeader', MainHeader)
app.component('MainFooter', MainFooter)
app.component('SideNav', SideNav)

// 注册组件后即可使用
app.component(Charts.name, Charts)
app.component(Editor.name, Editor)

app.use(router)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
