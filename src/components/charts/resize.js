import { onBeforeUnmount, onMounted, ref } from 'vue'
import { addResizeListener, removeResizeListener } from '../../utils/resize-event'
import { debounce } from '../../utils/utils'

export default function useResize(elRef, chartInstance) {

  return {
    resize
  }
}
