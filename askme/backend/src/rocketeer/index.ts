/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoosterConfig, RocketDescriptor } from '@boostercloud/framework-types'
import * as AWS from '@boostercloud/framework-provider-aws'
import * as Azure from '@boostercloud/framework-provider-azure'
import * as K8s from '@boostercloud/framework-provider-kubernetes'
import { Booster } from '@boostercloud/framework-core'
import config from '../rocketeer/rocket'

/* eslint-disable @typescript-eslint/generic-type-naming */
type Primitive = string | number | boolean | any

type Rocket = Record<string, Primitive | ReadonlyArray<Primitive> | Record<string, Primitive>>

type Config = typeof config

let provider: typeof AWS.Provider
const providerParams: Array<RocketDescriptor> = []

export default function rocketeerConfigure(): void {
  const environment = process.env.BOOSTER_ENV?.trim() as keyof Config['environments']
  if (!environment) {
    throw new Error('Environment variable BOOSTER_ENV is not set')
  }
  const commonConfigSetter = reduceRockets(config.common)
  const envConfig = config.environments[environment] ?? {}
  const environmentConfigSetter = reduceRockets(envConfig)
  Booster.configure(environment, (config: BoosterConfig): void => {
    commonConfigSetter(config)
    environmentConfigSetter(config)
    if (!provider) {
      return
    }
    config.provider = provider(providerParams)
  })
}

const reduceRockets = (rkt: Record<string, Rocket>): ((config: BoosterConfig) => void) =>
  Object.entries(rkt).reduce(
    (acc, [rocket, cfg]) => (config: BoosterConfig): void => {
      acc(config)
      const operation = mkOp(rocket, cfg)
      operation(config)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: BoosterConfig): void => {}
  )

const mkOp = (rocket: string, cfg: Rocket): ((config: BoosterConfig) => void) => {
  switch (rocket) {
    case 'appInfo': {
      return setAppName(cfg.name as string)
    }
    case 'assets': {
      return setAssets(cfg.files as Array<string>)
    }
    case 'aws': {
      provider = AWS.Provider
      return unit
    }
    case 'azure': {
      provider = Azure.Provider
      return unit
    }
    case 'kubernetes': {
      provider = K8s.Provider
      return unit
    }
    case 'logger': {
      return (c) => {
        c.logLevel = cfg.level as any
      }
    }
    case 'kafka': {
      providerParams.push({
        packageName: '@boostercloud/rocket-kafka-aws-infrastructure',
        parameters: {
          consumerConfig: cfg.consumerConfig,
          producerConfig: cfg.producerConfig,
          bootstrapServers: cfg.bootstrapServers,
          secretArn: cfg.secretArn,
        },
      })
      return unit
    }
    default: {
      return unit
    }
  }
}

const unit = (): void => {}

const setAppName = (name: string) => (config: BoosterConfig): void => {
  config.appName = name
}

const setAssets = (assets: string[]) => (config: BoosterConfig): void => {
  config.assets = assets
}
