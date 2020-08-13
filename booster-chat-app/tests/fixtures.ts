import { internet, image, random, phone, name } from 'faker'

const platforms = ['Android', 'iOS']
const prefixes = ['+34', '+1', '+44']

const generateRandomUser = () => {
  return {
    email: internet.email(),
    displayName: name.findName(),
    alias: random.word(),
    photoUrl: image.avatar(),
    notificationToken: random.uuid(),
    phoneNumber: phone.phoneNumber(),
    platform: random.arrayElement(platforms),
    prefix: random.arrayElement(prefixes),
    deleted: false,
  }
}

export const senderUser = generateRandomUser()
export const receiverUser = generateRandomUser()
