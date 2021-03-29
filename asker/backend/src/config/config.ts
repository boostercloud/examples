import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

Booster.configure('on-aws', (config: BoosterConfig): void => {
  config.appName = 'askme'
  config.provider = Provider([
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
              text: 'text'
            }
          },
        ],
        bootstrapServers: [
          'fast-caboose-01.srvs.cloudkafka.com:9094',
        ],
        secretArn: 'arn:aws:secretsmanager:us-east-1:515849006004:secret:AskerSecretProducer-Ezrc1w'
      },
    },
  ])
})
