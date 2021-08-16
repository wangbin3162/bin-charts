import Charts from './components/charts'
import log from './utils/log'

import config from '../package.json'

const version = config.version // version_ to fix tsc issue

const install = function (app, options = {}) {
  app.component(Charts.name, Charts)

  if (!options.disabledDoc) {
    log.printVersion(config.name, config.version, config.homepage, '#13c2c2')
  }
  return app
}

export { Charts }

export default { version, install }
