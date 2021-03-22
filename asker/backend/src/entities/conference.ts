import { Entity } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Entity
export class Conference {
  public constructor(public id: UUID, readonly name: string) {}
}
