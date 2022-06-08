export default {
  name: 'AskMe',
  common: {
    appInfo: {
      name: 'askme',
    },
    assets: {
      files: ['.env'],
    },
    booster: {
      app: './dist/index.js',
    },
  },
  environments: {
    'on-aws-with-kafka-prod': {
      aws: {},
      kafka: {
        consumerConfig: [],
        producerConfig: [
          {
            topicName: 'askme',
            eventTypeName: 'QuestionAsked',
            fields: {
              questionId: 'questionId',
              conference: 'conference',
              text: 'text',
            },
          },
        ],
        bootstrapServers: ['<FILL IN HERE>'],
        secretArn: '<FILL IN HERE>',
      },
    },
    dev: {
      local: {},
    },
    'on-aws': {
      aws: {},
      logger: {
        level: 'error',
      },
    },
    'on-k8s-aws': {
      kubernetes: {},
    },
    'on-k8s-gcp': {
      kubernetes: {},
    },
    'on-k8s-azure': {
      kubernetes: {},
    },
  },
} as const
