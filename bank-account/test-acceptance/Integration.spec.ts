import { createPassword, createUser, getAuthToken, graphQLClient } from './Utils'
import { UUID } from '@boostercloud/framework-types/dist'
import { ApolloClient, gql, MutationOptions, NormalizedCacheObject } from '@apollo/client'
import { expect } from './Setup.spec'
import * as faker from 'faker'

describe('Acceptance tests', async () => {
  const bankTellerEmail = faker.internet.email()
  const bankTellerPassword = createPassword()
  const customerEmail = faker.internet.email()
  const customerPassword = createPassword()
  const customerId = UUID.generate()

  let unauthorizedClient: ApolloClient<NormalizedCacheObject>
  let bankTellerClient: ApolloClient<NormalizedCacheObject>
  let customerClient: ApolloClient<NormalizedCacheObject>
  const createBankAccount = (ownerID: UUID): MutationOptions => {
    return {
      mutation: gql`
          mutation{
              CreateBankAccount(
                  input: {
                      owner: "${ownerID}"
                  }
              )
          }
      `,
    }
  }
  const deposit = (accountID: UUID, amount: number): MutationOptions => {
    return {
      mutation: gql`
          mutation{
              Deposit(
                  input: {
                      iban: "${accountID}"
                      amount: "${amount}"
                  }
              )
          }
      `,
    }
  }

  before(async () => {
    try {
      //deploy()
      await Promise.all([
        createUser(bankTellerEmail, bankTellerPassword, 'BankTeller'),
        createUser(customerEmail, customerPassword, 'Customer'),
      ])

      unauthorizedClient = await graphQLClient()
      bankTellerClient = await graphQLClient(await getAuthToken(bankTellerEmail, bankTellerPassword))
      customerClient = await graphQLClient(await getAuthToken(customerEmail, customerPassword))
    } catch (error) {
      throw Error(error)
    }
  })

  after(() => {
    //nuke()
  })

  context('CreateBankAccount', () => {
    it('success when submitted by a BankTeller', async () => {
      const result = await bankTellerClient.mutate(createBankAccount(customerId))

      expect(result).to.be.deep.equal({ data: { CreateBankAccount: true } })
    })
    it('fails when submitted by a Customer', async () => {
      const result = customerClient.mutate(createBankAccount(customerId))

      await expect(result).to.eventually.be.rejectedWith("Access denied for command 'CreateBankAccount'")
    })
    it('fails when submitted without token', async () => {
      const anyOwnerId = UUID.generate()

      const result = unauthorizedClient.mutate(createBankAccount(anyOwnerId))

      await expect(result).to.eventually.be.rejectedWith("Access denied for command 'CreateBankAccount'")
    })
  })

  context('Deposit', () => {
    it('success when submitted by a BankTeller', async () => {
      const amount = 10000
      const result = await bankTellerClient.mutate(deposit(accountId, amount))

      expect(result).to.be.deep.equal({ data: { Deposit: true } })
    })
    it.skip('success when submitted by a Customer')
    it.skip('fails when submitted without token')
  })
})
