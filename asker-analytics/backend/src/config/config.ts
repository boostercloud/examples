import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

Booster.configure('on-aws', (config: BoosterConfig): void => {
  config.appName = 'asker-analytics'
  config.provider = Provider([
    {
      packageName: '@boostercloud/rocket-kakfa-connector-aws-infrastructure',
      parameters: {
        consumerConfig: [
          {
            topicName: 'asker-questions',
            mappingOptions: [
              {
                topicEntityId: 'conferenceId',
                entityTypeName: 'Conference',
                eventTypeName: 'QuestionAsked',
                fields: {
                  questionId: 'questionId',
                  conferenceId: 'id',
                  text: 'text',
                },
              },
            ],
          },
        ],
        producerConfig: [],
        bootstrapServers: ['fast-caboose-01.srvs.cloudkafka.com:9094'],
        secretArn: process.env.secretArn,
      },
    },
  ])
})
