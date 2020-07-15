import { Role } from '@boostercloud/framework-core'

@Role({
  allowSelfSignUp: true,
})
export class Banker {}

@Role({
  allowSelfSignUp: true,
})
export class Client {}
