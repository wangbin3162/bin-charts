import { formatDataSeries, formatDataSet, formatSeries } from '../../utils/util'

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示 https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false

    Vue.prototype.$formator = { formatDataSet, formatSeries, formatDataSeries }
  }
}
