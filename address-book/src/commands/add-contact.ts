import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { ContactCreated } from '../events/contact-created'

@Command({
  authorize: 'all',
})
export class AddContact {
  public constructor(
    readonly id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly address: string,
    readonly phoneNumber: string
  ) {}

  public static async handle(command: AddContact, register: Register): Promise<void> {
    register.events(
      new ContactCreated(command.id, command.firstName, command.lastName, command.address, command.phoneNumber)
    )
  }
}
