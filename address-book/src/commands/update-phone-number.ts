import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PhoneNumberChanged } from '../events/phone-number-changed'

@Command({
  authorize: 'all',
})
export class UpdatePhoneNumber {
  public constructor(readonly id: UUID, readonly phoneNumber: string) {}

  public static async handle(command: UpdatePhoneNumber, register: Register): Promise<void> {
    register.events(new PhoneNumberChanged(command.id, command.phoneNumber))
  }
}
