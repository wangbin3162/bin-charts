<template>
  <div class="bin-chart" :style="wrapStyle" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './resize'

export default {
  name: 'BCharts',
  mixins: [resize],
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
    },
    theme: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    wrapStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.rebuild()
    },
    rebuild() {
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      this.chart = echarts.init(this.$el, this.theme)
      this.setOptions(this.options)
    },
    refresh() {
      this.clear()
      this.setOptions(this.options)
    },
    setOptions(opts) {
      if (this.chart) {
        this.chart.setOption(opts)
      }
    },
    clear() {
      if (this.chart) {
        this.chart.clear()
      }
    },
    // 触发事件
    dispatchAction(obj) {
      if (this.chart) {
        this.chart.dispatchAction(obj)
      }
    },
    showLoading(opts) {
      if (this.chart) {
        this.chart.showLoading(opts)
      }
    },
    hideLoading() {
      if (this.chart) {
        this.chart.hideLoading()
      }
    },
    getInstance() {
      return this.chart
    }
  }
}
</script>
