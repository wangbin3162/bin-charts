## ehcarts 包裹组件

### 基础用法

可以用传统的options配置，也可以借助提供的三种默认方法进行格式转换

::: demo
```html
<template>
      <div style="width: 100%;height: 425px;border:1px solid #ddd;margin: 20px 0;">
        <b-split :default-percent="50">
          <div slot="left" class="left-container">
            <div id="chart1" style="width: 100%;height: 100%;padding-top:15px;position: relative;">
              <b-charts height="350px" :options="lineChartOption"/>
            </div>
          </div>
          <div slot="right" class="right-container">
            数据源:
            <b-code-editor v-model="dataSource" @on-change="dataSourceChange"/>
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
          xAxis: { type: 'category', boundaryGap: false },
          yAxis: { type: 'value', axisLine: { show: false } },
          series: [{
            type: 'line',
            name: '数量',
            areaStyle: { opacity: 0.4 },
            itemStyle: { color: '#c7c7ff' },
            showSymbol: false
          }],
          dataset: this.$formator.formatDataSet(
            { xField: 'month', yField: 'value' }, []
          )
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
| value    | 绑定数据，可用v-model   | String  |  —   |   0  |
| show-number   | 显示行号   | Boolean  |  —   |   true  |
| mode   | 模式   | String  |  'application/json','text/javascript'   |   'application/json'  |
| theme   | 提供若干个默认比较好看的皮肤   | String  | 可选值参考其他配置项中列出  |   idea  |
| lint   | 是否进行lint检查   | Boolean  | 暂时只支持json  |   true  |
| readonly   | 只读模式   | Boolean  | -  |   false  |

### Events

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| on-change    | 输入项改变事件   | value  |
