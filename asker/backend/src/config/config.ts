import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import * as AWS from '@boostercloud/framework-provider-aws'
import * as K8s from '@boostercloud/framework-provider-kubernetes'

Booster.configure('on-aws', (config: BoosterConfig): void => {
  config.appName = 'asker'
  config.provider = AWS.Provider()
})

Booster.configure('on-k8s', (config: BoosterConfig): void => {
  config.appName = 'asker'
  config.provider = K8s.Provider()
})
