import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

require('dotenv').config()

Booster.configure('on-aws-prod', (config: BoosterConfig): void => {
  config.appName = 'askme-analytics-prod'
  config.assets = ['.env']
  config.provider = Provider([
    {
      packageName: '@boostercloud/rocket-kafka-aws-infrastructure',
      parameters: {
        consumerConfig: [
          {
            topicName: 'askme-questions-asked',
            mappingOptions: [
              {
                topicEntityId: 'conferenceId',
                entityTypeName: 'Conference',
                eventTypeName: 'QuestionAsked',
                fields: {
                  questionId: 'id',
                  conferenceId: 'conferenceId',
                  text: 'text',
                },
              },
            ],
          },
        ],
        producerConfig: [],
        bootstrapServers: process.env.bootstrapServers?.split(','),
        secretArn: process.env.secretArn,
      },
    },
  ])
})
