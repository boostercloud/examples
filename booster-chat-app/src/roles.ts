import { Role } from '@boostercloud/framework-core'

@Role({
  allowSelfSignUp: true,
})
export class User {}

@Role({
  allowSelfSignUp: true,
})
export class Admin {}
