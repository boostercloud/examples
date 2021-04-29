import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { AddressChanged } from '../events/address-changed'

@Command({
  authorize: 'all',
})
export class UpdateAddress {
  public constructor(readonly id: UUID, readonly address: string) {}

  public static async handle(command: UpdateAddress, register: Register): Promise<void> {
    register.events(new AddressChanged(command.id, command.address))
  }
}
