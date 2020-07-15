import { assert } from 'chai'
import { BankAccount } from '../src/entities/BankAccount'
import { BankAccountCreated } from '../src/events/BankAccountCreated'
import { UUID } from '@boostercloud/framework-types/dist'
import { DepositPerformed } from '../src/events/DepositPerformed'

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

  describe('reduceDepositPerformed', () => {
    it('should increase the account balance in the given deposit amount', () => {
      const givenAmount = 10.0
      const someDeposit = new DepositPerformed(givenIban, givenAmount)
      const accountWithBalanceZero = new BankAccount(givenIban, givenOwner, 0.0)

      const result = BankAccount.reduceDepositPerformed(someDeposit, accountWithBalanceZero)

      assert.deepEqual(result, {
        id: accountWithBalanceZero.id,
        owner: accountWithBalanceZero.owner,
        balance: 10.0,
      })
    })
  })
})
