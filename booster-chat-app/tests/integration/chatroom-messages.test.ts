import {
  confirmUser,
  deleteUser,
  DisconnectableApolloClient,
  graphQLClientWithSubscriptions,
  postUser,
  signInUser,
  waitForIt,
} from '../utils'
import gql from 'graphql-tag'
import {internet, random} from 'faker'
import {receiverUser, senderUser} from '../fixtures'
import {before, describe} from 'mocha'
import * as chai from 'chai'
import {expect} from 'chai'

chai.use(require('chai-as-promised'))

const createUserProfile = (client: DisconnectableApolloClient, user: any) => {
  return client.mutate({
    variables: user,
    mutation: gql`
      mutation CreateUserProfile($alias: String, $photoUrl: String) {
        CreateUserProfile(input: { alias: $alias, photoUrl: $photoUrl })
      }
    `,
  })
}

describe('chat room and messages e2e tests', async () => {
  let senderClient: DisconnectableApolloClient
  let receiverClient: DisconnectableApolloClient
  let chatRoomId: string
  // TODO: Messages testing -- const messages = createMessages()

  const senderPass = `${internet.password()}Pa$$w0rd`
  const receiverPass = `${internet.password()}Pa$$w0rd`

  const chatRoomParams = {
    id: random.uuid(),
    name: random.word(),
    description: random.words(10),
    isPrivate: random.boolean(),
  }

  before(async () => {
    const senderCredentials = { email: senderUser.email, password: senderPass, role: 'Admin' }
    const receiverCredentials = {
      email: receiverUser.email,
      password: receiverPass,
      role: 'User',
    }

    await Promise.all([postUser(senderCredentials), postUser(receiverCredentials)])
    await Promise.all([confirmUser(senderUser.email), confirmUser(receiverUser.email)])

    const signInResponses = await Promise.all([signInUser(senderCredentials), signInUser(receiverCredentials)])

    senderClient = await graphQLClientWithSubscriptions((await signInResponses[0].json()).accessToken)
    receiverClient = await graphQLClientWithSubscriptions((await signInResponses[1].json()).accessToken)

    await Promise.all([createUserProfile(senderClient, senderUser), createUserProfile(receiverClient, receiverUser)])
  })

  after(async () => {
    await Promise.all([deleteUser(senderUser.email), deleteUser(receiverUser.email)])
    senderClient.disconnect()
    receiverClient.disconnect()
  })

  context('chat rooms', () => {
    it('successfully creates a new chat room', async () => {
      const response = await senderClient.mutate({
        variables: chatRoomParams,
        mutation: gql`
          mutation CreateChatRoom($id: ID, $name: String, $description: String, $isPrivate: Boolean) {
            CreateChatRoom(input: { id: $id, name: $name, description: $description, isPrivate: $isPrivate })
          }
        `,
      })
      expect(response).not.to.be.null
      expect(response?.data?.CreateChatRoom).to.be.true

      const queryResult = await waitForIt(
        () => {
          return senderClient.query({
            query: gql`
              query ChatRoomReadModels {
                ChatRoomReadModels {
                  id
                  name
                  description
                  isPrivate
                }
              }
            `,
          })
        },
        (result) => result?.data?.ChatRoomReadModels.length > 0
      )
      const chatRoomReadModels = queryResult?.data?.ChatRoomReadModels
      const chatRooms = chatRoomReadModels.map((item: any) => {
        return { description: item.description, name: item.name }
      })

      expect(chatRooms).to.deep.include({ description: chatRoomParams.description, name: chatRoomParams.name })

      chatRoomId = chatRoomReadModels.find((item: any) => item.description === chatRoomParams.description).id
    })

    it('successfully updates an existing chat room', async () => {
      const newChatRoomParams = {
        id: chatRoomId,
        name: random.word(),
        description: random.words(10),
        isPrivate: random.boolean()
      }

      const response = await senderClient.mutate({
        variables: newChatRoomParams,
        mutation: gql`
          mutation UpdateChatRoom($id: ID, $name: String, $description: String, $isPrivate: Boolean) {
            UpdateChatRoom(input: { 
              id: $id,
              name: $name, 
              description: $description, 
              isPrivate: $isPrivate
            })
          }
        `,
      })
      expect(response).not.to.be.null
      expect(response?.data?.UpdateChatRoom).to.be.true

      const queryResult = await waitForIt(
        () => {
          return senderClient.query({
            variables: {
              id: chatRoomId,
            },
            query: gql`
              query ChatRoomReadModel($id: ID!) {
                ChatRoomReadModel(id: $id) {
                  id
                  name
                  description
                }
              }
            `,
          })
        },
        (result) => result?.data?.ChatRoomReadModel.description === newChatRoomParams.description
      )

      const chatRoom = queryResult?.data?.ChatRoomReadModel
      expect(chatRoom).not.to.be.null
      expect(chatRoom.description).to.be.equals(newChatRoomParams.description)
      expect(chatRoom.name).to.be.equals(newChatRoomParams.name)
    })
  })
})
