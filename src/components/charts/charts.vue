<template>
  <div class="bin-charts" ref="elRef" :style="wrapStyle" />
</template>

<script>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { debounce } from '../../utils/utils'
import { addResizeListener, removeResizeListener } from '../../utils/resize-event'

export default {
  name: 'BCharts',
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
  setup(props) {
    const elRef = ref(null)
    let chartInstance = null
    let __resizeHandler = null

    onMounted(() => {
      init()
      __resizeHandler = debounce(resize, 100)
      addResizeListener(elRef.value, __resizeHandler)
    })

    onBeforeUnmount(() => {
      removeResizeListener(elRef.value, __resizeHandler)

      if (!chartInstance) return
      chartInstance.dispose()
      chartInstance = null
    })

    watch(() => props.options, (val) => {
      setOptions(val)
    }, { deep: true })

    function init() {
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
      chartInstance = echarts.init(elRef.value)
      setOptions(props.options)
    }

    function resize() {
      if (chartInstance) {
        chartInstance.resize()
      }
    }

    function setOptions(opts) {
      if (chartInstance) {
        chartInstance.setOption(opts)
      }
    }

    function clear() {
      if (chartInstance) {
        chartInstance.clear()
      }
    }

    function refresh() {
      clear()
      setOptions(props.options)
    }

    // 触发事件
    function dispatchAction(obj) {
      if (chartInstance) {
        chartInstance.dispatchAction(obj)
      }
    }

    function showLoading(opts) {
      if (chartInstance) {
        chartInstance.showLoading(opts)
      }
    }

    function hideLoading() {
      if (chartInstance) {
        chartInstance.hideLoading()
      }
    }

    function getInstance() {
      return chartInstance
    }

    return {
      elRef,
      resize,
      init,
      getInstance,
      refresh,
      clear,
      setOptions,
      dispatchAction,
      showLoading,
      hideLoading
    }
  }
}
</script>
