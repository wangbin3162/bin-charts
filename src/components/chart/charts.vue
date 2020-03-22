<template>
  <div class="bin-chart" :style="wrapStyle"/>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
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
        type: String
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
      this.initChart()
    },
    methods: {
      initChart() {
        if (this.chart) {
          return
        }
        this.chart = echarts.init(this.$el, this.theme)
        this.setOptions(this.options)
      },
      setOptions(opts) {
        this.chart.setOption(opts)
      }
    }
  }
</script>
