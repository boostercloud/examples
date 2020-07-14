import { Role } from '@boostercloud/framework-core/dist'

@Role({
  allowSelfSignUp: false,
})
export class Banker {}
