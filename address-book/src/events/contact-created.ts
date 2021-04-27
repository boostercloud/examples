import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class ContactCreated {
  public constructor(
    readonly id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly address: string,
    readonly phoneNumber: string
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
