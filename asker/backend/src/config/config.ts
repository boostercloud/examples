import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider as ProviderAWS } from '@boostercloud/framework-provider-aws'
import  { Provider  as ProviderK8s} from '@boostercloud/framework-provider-kubernetes'
import { BoosterK8sConfiguration } from '@boostercloud/framework-provider-kubernetes-infrastructure'
require('dotenv').config()

Booster.configure('on-aws', (config: BoosterConfig): void => {
  config.appName = 'askme'
  config.provider = ProviderAWS([])
})

Booster.configure('on-aws-with-kafka', (config: BoosterConfig): void => {
  config.appName = 'askme-with-kafka'
  config.provider = ProviderAWS([
    {
      packageName: '@boostercloud/rocket-kakfa-connector-aws-infrastructure',
      parameters: {
        consumerConfig: [],
        producerConfig: [
          {
            topicName: 'asker-questions',
            eventTypeName: 'QuestionAsked',
            fields: {
              questionId: 'questionId',
              conference: 'conferenceId',
              text: 'text',
            },
          },
        ],
        bootstrapServers: process.env.bootstrapServers?.split(','),
        secretArn: process.env.secretArn,
      },
    },
  ])
})

Booster.configure('on-k8s-aws', (config: BoosterK8sConfiguration): void => {
  config.appName = 'askme'
  config.provider = ProviderK8s()
  config.context = process.env.clusterK8sAWS
})

Booster.configure('on-k8s-gcp', (config: BoosterK8sConfiguration): void => {
  config.appName = 'askme'
  config.provider = ProviderK8s()
  config.context = process.env.clusterK8sGCP
})

Booster.configure('on-k8s-azure', (config: BoosterK8sConfiguration): void => {
  config.appName = 'askme'
  config.provider = ProviderK8s()
  config.context = process.env.clusterK8sAZURE
})
