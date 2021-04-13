## ehcarts 包裹组件

### 基础用法

根据 <a href="https://echarts.apache.org/zh/option.html#title" target="_blank">options</a> 配置项初始化数据

::: demo

```html

<template>
  <b-button type="primary" @click="refresh">运行</b-button>
  <div style="width: 100%;height: 358px;border:1px solid #ddd;margin: 20px 0;">
    <b-split :default-percent="50">
      <div slot="left" class="left-container">
        <div id="chart1" style="width: 100%;height: 100%;padding-top:15px;position: relative;">
          <b-charts height="340px" ref="chart" :options="lineChartOption" />
        </div>
      </div>
      <div slot="right" class="right-container">
        配置项:
        <b-ace-editor v-model="dataSource" @change="dataSourceChange" height="335" />
      </div>
    </b-split>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lineChartOption: {
          tooltip: { trigger: 'axis' },
          title: { text: '默认折线图' },
          grid: { top: 80, right: 30 },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: { type: 'value' },
          series: [{
            type: 'line',
            name: '数量',
            data: [220, 315, 213, 432, 566, 143, 567, 356, 1200, 332, 900, 1010]
          }]
        },
        dataSource: ''
      }
    },
    created() {
      this.dataSource = JSON.stringify(this.lineChartOption, null, 2)
    },
    methods: {
      dataSourceChange(val) {
        try {
          this.lineChartOption = JSON.parse(val)
        } catch (e) {

        }
      },
      refresh() {
        if (this.$refs.chart) {
          this.$refs.chart.refresh()
        }
      }
    }
  }
</script>
```

:::

### 自定义

可以配置主题，或者自定义主题，默认提供一个theme，也可以自定义引入，可以借助提供的`format`方法来格式化数据源

::: demo

```html

<template>
  <b-button type="primary" @click="refresh">运行</b-button>
  <b-button type="warning" @click="asyncLoad" :loading="loading">延迟载入</b-button>
  <b-button type="danger" @click="rebuild">重绘</b-button>
  <div style="width: 100%;height: 358px;border:1px solid #ddd;margin: 20px 0;">
    <b-split :default-percent="50">
      <div slot="left" class="left-container">
        <div id="chart1" style="width: 100%;height: 100%;padding-top:15px;position: relative;">
          <b-charts height="340px" ref="chart" :theme="theme" :options="lineChartOption" />
        </div>
      </div>
      <div slot="right" class="right-container">
        数据源:
        <b-ace-editor v-model="dataSource" @change="dataSourceChange" height="335" />
      </div>
    </b-split>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        theme: {
          color: [
            '#37a2da',
            '#ffdb5c',
            '#ff9f7f',
            '#32c5e9',
            '#67e0e3',
            '#9fe6b8',
            '#fb7293'
          ]
        },
        lineChartOption: {
          tooltip: { trigger: 'axis' },
          title: { text: '默认折线图' },
          grid: { top: 80, right: 30 },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: { type: 'value' },
          series: [
            {
              type: 'line',
              name: '指标1',
              data: [220, 315, 213, 432, 566, 143, 567, 356, 1200, 332, 900, 1010]
            }, {
              type: 'line',
              name: '指标2',
              data: [120, 515, 113, 1432, 426, 523, 127, 3356, 1120, 412, 562, 212]
            }
          ]
        },
        dataSource: '',
        loading: false
      }
    },
    mounted() {
      this.dataSource = JSON.stringify(this.lineChartOption, null, 2)
    },
    methods: {
      dataSourceChange(val) {
        try {
          this.lineChartOption = JSON.parse(val)
        } catch (e) {

        }
      },
      rebuild() {
        if (this.$refs.chart) {
          this.$refs.chart.rebuild()
        }
      },
      refresh() {
        if (this.$refs.chart) {
          this.$refs.chart.refresh()
        }
      },
      asyncLoad() {
        if (this.$refs.chart) {
          this.loading = true
          this.$refs.chart.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0.8)',
            zlevel: 0,
            // 字体大小。从 `v4.8.0` 开始支持。
            fontSize: 16,
            // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
            showSpinner: true,
            // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
            spinnerRadius: 20,
            // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
            lineWidth: 2,
            // 字体粗细。从 `v5.0.1` 开始支持。
            fontWeight: 'normal',
            // 字体风格。从 `v5.0.1` 开始支持。
            fontStyle: 'normal',
            // 字体系列。从 `v5.0.1` 开始支持。
            fontFamily: 'sans-serif'
          })
          setTimeout(() => {
            this.refresh()
            this.$refs.chart.hideLoading()
            this.loading = false
          }, 1500)
        }
      }
    }
  }
</script>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width    | 默认宽度   | String  |  —   |   100%  |
| height   | 默认高度   | String  |  —   |   350px  |
| options   | 配置项   | Object  |  —   |  — |
| theme   | 皮肤项  | Object  |  不兼容老版本，老版本为默认皮肤字符串  |   —  |

### event

| 参数      | 说明    | 参数      | 返回值|
|---------- |-------- |---------- |-------------  |
| getInstance    | 获取echarts初始化实例，等同于组件内部的chart   |  —  |  —   | 
| setOptions    | 设置配置项   | opts :参数见 <a href="https://echarts.apache.org/zh/option.html#title" target="_blank">官网</a> |  —   |  
| clear   | 清空当前实例，会移除实例中所有的组件和图表。   | String  |  —   |  
| resize   | 变图表尺寸，在容器大小发生改变时需要手动调用。   | opts  |  —   |  
| dispatchAction   | 触发事件  | opts  |  —   |  
| refresh   | 刷新当前图表，不同于配置项设置，此方法相当于clear后重新setOptions  | —  |  —   |  
| rebuild   | 重新创建实例，此方法相当于重新创建实例，绑定的事件等需要重新监听  | —  |  —   |  
| showLoading   | 加载动画   |  opts：参数见下方  |  —   |  
| hideLoading   | 隐藏动画加载效果  | —  |  —   |  

### 加载动画参数

```javascript
var options: {
  text: 'loading',
  color: '#c23531',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0,

  // 字体大小。从 `v4.8.0` 开始支持。
  fontSize: 12,
  // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
  showSpinner: true,
  // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
  spinnerRadius: 10,
  // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
  lineWidth: 5,
  // 字体粗细。从 `v5.0.1` 开始支持。
  fontWeight: 'normal',
  // 字体风格。从 `v5.0.1` 开始支持。
  fontStyle: 'normal',
  // 字体系列。从 `v5.0.1` 开始支持。
  fontFamily: 'sans-serif'
}
````

### 转换函数说明

转换函数通过`this.$formator`调用，也可自行引入，基本适应日常开发需求

```javascript
// 1.formatDataSet(opts,dataSource) 
// 转换数据集
let opts1 = { xField: 'x', yField: 'y', seriesField: 's' }
let dataSource1 = [
  { x: '1月', y: '111', s: '系列一' },
  { x: '1月', y: '222', s: '系列二' },
  { x: '2月', y: '222', s: '系列一' },
  { x: '2月', y: '222', s: '系列二' }
]
//  return {
//    source:[
//      ['x','系列一','系列二'],
//      ['1月',111,222],
//      ['2月',222,222]
//    ]
//  }

// 2.formatDataSet(opts,dataSource) 
// 转换成系列平铺数组
let opts2 = { xField: 'x', yField: 'y', seriesField: 'legend' }
let dataSource2 = [{ data: [], legend: '系列1' }, { data: [], legend: '系列2' }]
//  return {
//    source:[
//      ['x','系列一','系列二'],
//      ['1月',111,222],
//      ['2月',222,222]
//    ]
//  }

// 3.formatDataSeries(opts,dataSource) 
// 转换成类别分组数据，适用于未知系列条目数量的options配置，传统型数据的转换，方便遍历取值
let opts3 = { xField: 'x', yField: 'y', seriesField: 'legend' }
let dataSource3 = [{ data: [], legend: '系列1' }, { data: [], legend: '系列2' }]
//  return [{
//    seriesName: "自然人"
//    xAxis: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
//    data: ["100", "200", "300", "500", "100", "200", "300", "500", "100", "200", "300", "500"]
//  }]
```

