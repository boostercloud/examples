import { createPassword, createUser, deploy, getAuthToken, graphQLClient, nuke } from './Utils'
import { UUID } from '@boostercloud/framework-types/dist'
import { ApolloClient, gql, MutationOptions, NormalizedCacheObject } from '@apollo/client'
import { expect } from './Setup.spec'
import * as faker from 'faker'

describe('Acceptance tests', async () => {
  const bankTellerEmail = faker.internet.email()
  const bankTellerPassword = createPassword()
  const clientID = UUID.generate()

  let unauthorizedClient: ApolloClient<NormalizedCacheObject>
  let bankTellerClient: ApolloClient<NormalizedCacheObject>
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

  before(async () => {
    try {
      //deploy()
      await createUser(bankTellerEmail, bankTellerPassword, 'BankTeller')
      unauthorizedClient = await graphQLClient()
      bankTellerClient = await graphQLClient(await getAuthToken(bankTellerEmail, bankTellerPassword))
    } catch (error) {
      throw Error(error)
    }
  })

  after(() => {
    //nuke()
  })

  context('CreateBankAccount', () => {
    it('success when submitted by a BankTeller', async () => {
      const result = await bankTellerClient.mutate(createBankAccount(clientID))

      expect(result).to.be.deep.equal({ data: { CreateBankAccount: true } })
    })
    it.skip('fails when submitted by clients')
    it('fails when submitted without token', async () => {
      const anyOwnerId = UUID.generate()

      const result = unauthorizedClient.mutate(createBankAccount(anyOwnerId))

      await expect(result).to.eventually.be.rejectedWith("Access denied for command 'CreateBankAccount'")
    })
  })

  context('Deposit', () => {
    it.skip('success when submitted by bankers')
    it.skip('success when submitted by clients')
    it.skip('fails when submitted without token')
  })
})
