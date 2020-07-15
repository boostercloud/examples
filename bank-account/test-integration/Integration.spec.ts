import { deploy, nuke } from './Utils'
import { UUID } from '@boostercloud/framework-types/dist'
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'
import { fetch } from 'cross-fetch'
import { expect } from './Setup.spec'

describe('Application', () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'https://xdc4vmm923.execute-api.eu-west-1.amazonaws.com/production/graphql',
      fetch,
    }),
    cache: new InMemoryCache(),
  })

  context('CreateBankAccount', () => {
    it.skip('success when submitted by bankers')
    it.skip('fails when submitted by clients')
    it('fails when submitted without token', async () => {
      const result = client.mutate({
        mutation: gql`
          mutation{
            CreateBankAccount(
              input: {
                owner: "${UUID.generate()}"
              }
            )
          }
        `,
      })
      await expect(result).to.eventually.be.rejectedWith("Access denied for command 'CreateBankAccount'")
    })
  })

  context('Deposit', () => {
    it.skip('success when submitted by bankers')
    it.skip('success when submitted by clients')
    it.skip('fails when submitted without token')
  })
})
