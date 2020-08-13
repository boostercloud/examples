import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

const appName = 'booster-chat-app'

Booster.configure('development', (config: BoosterConfig): void => {
  config.appName = `${appName}-prod`
  config.provider = Provider
})

Booster.configure('development', (config: BoosterConfig): void => {
  config.appName = `${appName}-dev`
  config.provider = Provider
})

Booster.configure('test', (config: BoosterConfig): void => {
  config.appName = `${appName}-test`
  config.provider = Provider
})
