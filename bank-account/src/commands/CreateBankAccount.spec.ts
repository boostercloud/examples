import { CreateBankAccount } from './CreateBankAccount'
import { Register, UUID } from '@boostercloud/framework-types'
import { assert, createStubInstance, match } from 'sinon'

describe('CrateBankAccount', () => {
  const anyOwnerId = UUID.generate()
  const register = createStubInstance(Register)

  describe('handle', () => {
    it('should register the BankAccountCreated event', async () => {
      await new CreateBankAccount(anyOwnerId).handle(register)

      assert.calledWith(
        register.events,
        match({
          owner: anyOwnerId,
          iban: match.string,
        })
      )
    })
  })
})
