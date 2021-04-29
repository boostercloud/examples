import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PhoneNumberChanged {
  public constructor(readonly id: UUID, readonly phoneNumber: string) {}

  public entityID(): UUID {
    return this.id
  }
}
