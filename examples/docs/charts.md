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
          <b-charts height="350px" :options="lineChartOption" />
        </div>
      </div>
      <div slot="right" class="right-container">
        配置项:
        <b-ace-editor v-model="dataSource" @on-change="dataSourceChange" height="300" />
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
          <b-charts height="350px" :theme="theme" :options="lineChartOption" />
        </div>
      </div>
      <div slot="right" class="right-container">
        数据源:
        <b-ace-editor v-model="dataSource" @on-change="dataSourceChange" height="300" />
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

