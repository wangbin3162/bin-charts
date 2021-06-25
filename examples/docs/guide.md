## 介绍

bin-charts现已更新至3.0.0+版本，为适应vue3+ ，原支持vue2.6版本已拉分支保存，最新保存版本为`1.0.1`版本

最新vue3版本的charts依赖echarts5+，之前版本暂不支持

### 最新版本

[![NPM version](https://img.shields.io/npm/v/bin-charts.svg)](https://www.npmjs.com/package/bin-charts)

## 安装

通过[unpkg.com/bin-charts](https://unpkg.com/bin-charts/) 可以看到 bin-charts
最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 和 css
文件即可开始使用：

```javascript
<!-- import Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- import bin-charts -->
<script src="https://unpkg.com/bin-charts@3.0.0/lib/index.min.js"></script>
```

`@3.0.0` 表示版本号3.0依赖vue3.0+ ,`@1.0.0` 表示版本号1.0依赖vue2.6 ,

**注意**

    0.x版本 依赖echarts 4.0+ ， 0.x版本稳定版为0.6.0，目前停止更新。
    
    1.x版本 依赖echarts 5.0+

    3.x版本，支持vue3+ echarts 5.0+

### npm 安装

推荐使用npm安装，它能更好地和[webpack](https://webpack.js.org/)打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
npm i bin-charts -S
# or 
yarn add bin-charts
```

## 引入

在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import Charts from 'bin-charts';
import App from './App.vue';

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
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
  CanvasRenderer
])
const app = createApp(App)
app.component(Charts.name, Charts)
app.mount('#app', true)
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
