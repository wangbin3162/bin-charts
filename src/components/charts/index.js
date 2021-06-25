import Charts from './charts.vue'

/* istanbul ignore next */
Charts.install = function (Vue) {
  Vue.component(Charts.name, Charts)
}

export default Charts
