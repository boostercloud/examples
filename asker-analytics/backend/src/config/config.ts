import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

Booster.configure('production', (config: BoosterConfig): void => {
  config.appName = 'asker-analytics-davidverdu'
  config.provider = Provider([
    {
      packageName: '@boostercloud/rocket-kakfa-connector-aws-infrastructure',
      parameters: {
        consumerConfig: [
          {
            topicName: 'asker-questions',
            mappingOptions: [
              {
                entityTypeName: 'Conference',
                eventTypeName: 'QuestionCreated',
                topicEntityId: 'conferenceId',
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
        bootstrapServers: [
          'fast-caboose-01.srvs.cloudkafka.com:9094',
        ],
        secretArn: process.env['KAFKA_SECRET_ARN'],
      },
    },
  ])
})
