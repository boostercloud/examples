import { Role } from '@boostercloud/framework-core'

@Role({
  auth: {
    signUpMethods: ['email'],
  },
})
export class BankTeller {}

@Role({
  auth: {
    signUpMethods: ['phone'],
  },
})
export class Customer {}
