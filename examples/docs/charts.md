## ehcarts 包裹组件

### 基础用法

可以用传统的options配置，也可以借助提供的三种默认方法进行格式转换

::: demo
```html
<template>
    <div style="width: 100%;height: 340px;border:1px solid #ddd;margin: 20px 0;">
        <b-split :default-percent="50">
          <div slot="left" class="left-container">
            <div id="chart1" style="width: 100%;height: 100%;padding-top:15px;position: relative;">
              <b-charts height="350px" :options="lineChartOption"/>
            </div>
          </div>
          <div slot="right" class="right-container">
            配置项:
            <b-ace-editor v-model="dataSource" @on-change="dataSourceChange" height="300"/>
          </div>
        </b-split>
      </div>
</template>
<script>
  require('../../src/theme/charts-theme')
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
            data :['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          },
          yAxis: { type: 'value'},
          series: [{
            type: 'line',
            name: '数量',
            data :[220,315,213,432,566,143,567,356,1200,332,900,1010]
          }]
        },
        dataSource:''
      }
    },
    created() {
      this.dataSource = JSON.stringify(this.lineChartOption,null,2)
    },
    methods: {
      dataSourceChange(val) {
        try {
          this.lineChartOption = JSON.parse(val)
        } catch (e) {

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
    <div style="width: 100%;height: 340px;border:1px solid #ddd;margin: 20px 0;">
        <b-split :default-percent="50">
          <div slot="left" class="left-container">
            <div id="chart1" style="width: 100%;height: 100%;padding-top:15px;position: relative;">
              <b-charts height="350px" theme="charts-theme" :options="lineChartOption"/>
            </div>
          </div>
          <div slot="right" class="right-container">
            数据源:
            <b-ace-editor v-model="dataSource" @on-change="dataSourceChange" height="300"/>
          </div>
        </b-split>
      </div>
</template>
<script>
  require('../../src/theme/charts-theme')
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
            }
          },
          yAxis: { type: 'value' },
          series: [{
            type: 'line',
            name: '数量',
            areaStyle: { opacity: 0.4 },
            showSymbol: false
          }],
          dataset: {
            source:[
              ['month','value']
            ]
          }
        },
        dataSource: JSON.stringify([
          { month: '1月', value: 220 },
          { month: '2月', value: 315 },
          { month: '3月', value: 434 },
          { month: '4月', value: 386 },
          { month: '5月', value: 409 },
          { month: '6月', value: 378 },
          { month: '7月', value: 533 },
          { month: '8月', value: 820 },
          { month: '9月', value: 1290 },
          { month: '10月', value: 1330 },
          { month: '11月', value: 901 },
          { month: '12月', value: 1290 }
        ], null, 2)
      }
    },
    created() {
      let data = JSON.parse(this.dataSource)
      this.lineChartOption.dataset = this.$formator.formatDataSet(
        { xField: 'month', yField: 'value' }, data
      )
    },
    methods: {
      dataSourceChange(val) {
        try {
          let data = JSON.parse(val)
          this.lineChartOption.dataset = this.$formator.formatDataSet(
            { xField: 'month', yField: 'value' }, data
          )
        } catch (e) {

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
| theme   | 皮肤项  | String  | 可引入src/theme/charts-theme来设置  |   —  |

### 转换函数说明

转换函数通过`this.$formator`调用，也可自行引入，基本适应日常开发需求

```javascript
// 1.formatDataSet(opts,dataSource) 
// 转换数据集
let opts1 = { xField:'x',  yField:'y' ,seriesField:'s'}
let dataSource1 = [
    {x:'1月',y:'111',s:'系列一'},
    {x:'1月',y:'222',s:'系列二'},
    {x:'2月',y:'222',s:'系列一'},
    {x:'2月',y:'222',s:'系列二'}
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
let opts2 = { xField:'x',  yField:'y' ,seriesField:'legend'}
let dataSource2 = [ {data:[],legend:'系列1'},{data:[],legend:'系列2'}]
//  return {
//    source:[
//      ['x','系列一','系列二'],
//      ['1月',111,222],
//      ['2月',222,222]
//    ]
//  }

// 3.formatDataSeries(opts,dataSource) 
// 转换成类别分组数据，适用于未知系列条目数量的options配置，传统型数据的转换，方便遍历取值
let opts3 = { xField:'x',  yField:'y' ,seriesField:'legend'}
let dataSource3 = [ {data:[],legend:'系列1'},{data:[],legend:'系列2'}]
//  return [{
//    seriesName: "自然人"
//    xAxis: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
//    data: ["100", "200", "300", "500", "100", "200", "300", "500", "100", "200", "300", "500"]
//  }]
```

