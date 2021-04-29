import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Contact } from '../entities/contact'

@ReadModel({
  authorize: 'all',
})
export class ContactReadModel {
  public constructor(
    public id: UUID,
    public firstName: string,
    public lastName: string,
    public address: string,
    public phoneNumber: string
  ) {}

  @Projects(Contact, 'id')
  public static projectContact(
    entity: Contact,
    currentContactReadModel?: ContactReadModel
  ): ProjectionResult<ContactReadModel> {
    return new ContactReadModel(entity.id, entity.firstName, entity.lastName, entity.address, entity.phoneNumber)
  }
}
