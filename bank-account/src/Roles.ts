import { Role } from '@boostercloud/framework-core'

@Role({
  allowSelfSignUp: false,
})
export class Banker {}

@Role({
  allowSelfSignUp: false,
})
export class Client {}
