import { assert } from 'chai'
import { BankAccount } from './BankAccount'
import { BankAccountCreated } from '../events/BankAccountCreated'
import { UUID } from '@boostercloud/framework-types/dist'

describe('BankAccount', () => {
  describe('reduceBankAccountCreated', () => {
    it('should return a new bank account with balance in zero', () => {
      const givenOwner = UUID.generate()
      const givenIban = UUID.generate()
      const anyBankAccount = undefined
      const accountCreated = new BankAccountCreated(givenOwner, givenIban)

      const result = BankAccount.reduceBankAccountCreated(accountCreated, anyBankAccount)

      assert.isNotNull(result.id)
      assert.equal(result.iban, givenIban)
      assert.equal(result.owner, givenOwner)
      assert.equal(result.balance, 0)
    })
  })
})
