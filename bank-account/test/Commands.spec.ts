import { CreateBankAccount } from '../src/commands/CreateBankAccount'
import { Register, UUID } from '@boostercloud/framework-types'
import { assert, createStubInstance, match, SinonStubbedInstance } from 'sinon'
import { Deposit } from '../src/commands/Deposit'

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
  describe('Deposit', () => {
    const anyAmount = 10.0
    const anyIban = UUID.generate()
    describe('handle', () => {
      it('should register the DepositPerformed event', async () => {
        await new Deposit(anyIban, anyAmount).handle(register)

        assert.calledOnceWithExactly(
          register.events,
          match({
            iban: anyIban,
            amount: anyAmount,
          })
        )
      })
    })
  })
})
