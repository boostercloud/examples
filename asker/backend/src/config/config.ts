import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

require('dotenv').config()

Booster.configure('on-aws', (config: BoosterConfig): void => {
  config.appName = 'askme-charlie'
  config.provider = Provider([])
})

Booster.configure('on-aws-with-kafka', (config: BoosterConfig): void => {
  config.appName = 'askme-charlie-with-kafka'
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
