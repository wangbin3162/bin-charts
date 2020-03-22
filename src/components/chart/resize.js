import { addResizeListener, removeResizeListener } from '../../utils/resize-event'
import { debounce } from '../../utils/util'

export default {
  mounted() {
    this.__resizeHandler = debounce(this.resizeChart, 100, false)
    addResizeListener(this.$el, this.__resizeHandler)
  },
  beforeDestroy() {
    removeResizeListener(this.$el, this.__resizeHandler)
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
