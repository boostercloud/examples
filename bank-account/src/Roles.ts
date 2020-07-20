import { Role } from '@boostercloud/framework-core'

@Role({
  allowSelfSignUp: true,
})
export class BankTeller {}

@Role({
  allowSelfSignUp: true,
})
export class Client {}
