import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { ContactCreated } from '../events/contact-created'
import { AddressChanged } from '../events/address-changed'
import { PhoneNumberChanged } from '../events/phone-number-changed'

@Entity
export class Contact {
  public constructor(
    public id: UUID,
    public firstName: string,
    public lastName: string,
    public address: string,
    public phoneNumber: string
  ) {}

  @Reduces(ContactCreated)
  public static reduceContactCreated(event: ContactCreated, currentContact?: Contact): Contact {
    if (currentContact) {
      return currentContact // if contact already exists we'll ignore the event
    } else {
      return new Contact(event.id, event.firstName, event.lastName, event.address, event.phoneNumber)
    }
  }

  @Reduces(AddressChanged)
  public static reduceAddressChanged(event: AddressChanged, currentContact: Contact): Contact {
    return new Contact(
      currentContact.id,
      currentContact.firstName,
      currentContact.lastName,
      event.address,
      currentContact.phoneNumber
    )
  }

  @Reduces(PhoneNumberChanged)
  public static reducePhoneNumberChanged(event: PhoneNumberChanged, currentContact: Contact): Contact {
    return new Contact(
      currentContact.id,
      currentContact.firstName,
      currentContact.lastName,
      currentContact.address,
      event.phoneNumber
    )
  }
}
