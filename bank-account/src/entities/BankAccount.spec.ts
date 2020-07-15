import { assert } from 'chai'
import { BankAccount } from './BankAccount'
import { BankAccountCreated } from '../events/BankAccountCreated'
import { UUID } from '@boostercloud/framework-types/dist'
import { DepositPerformed } from '../events/DepositPerformed'

describe('BankAccount', () => {
  const givenOwner = UUID.generate()
  const givenIban = UUID.generate()

  describe('reduceBankAccountCreated', () => {
    it('should return a new bank account with balance in zero', () => {
      const anyBankAccount = undefined
      const event = new BankAccountCreated(givenOwner, givenIban)

      const result = BankAccount.reduceBankAccountCreated(event, anyBankAccount)

      assert.deepEqual(result, {
        id: event.iban,
        owner: event.owner,
        balance: 0.0,
      })
    })
  })
})
