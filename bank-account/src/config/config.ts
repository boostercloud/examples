import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

Booster.configure('aws', (config: BoosterConfig): void => {
  config.appName = 'bank-account'
  config.provider = Provider()
})
