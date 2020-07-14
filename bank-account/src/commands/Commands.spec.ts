import { CreateBankAccount } from './CreateBankAccount'
import { Register, UUID } from '@boostercloud/framework-types'
import { assert, createStubInstance, match, SinonStubbedInstance } from 'sinon'
import { Deposit } from './Deposit'
// Will keep the tests for the commands in just one file because they are short and simple

describe('Commands', () => {
  let register: SinonStubbedInstance<Register>

  beforeEach(() => {
    register = createStubInstance(Register)
  })

  describe('CrateBankAccount', () => {
    const anyOwnerId = UUID.generate()

    describe('handle', () => {
      it('should register the BankAccountCreated event', async () => {
        await new CreateBankAccount(anyOwnerId).handle(register)

        assert.calledOnceWithExactly(
          register.events,
          match({
            owner: anyOwnerId,
            iban: match.string,
          })
        )
      })
    })
  })
})
