import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { UserProfileCreated } from '../events/user-profiles/UserProfileCreated'
import { UserProfileUpdated } from '../events/user-profiles/UserProfileUpdated'

@Entity
export class UserProfile {
  public constructor(public id: UUID, readonly alias: string, readonly photoUrl: string) {}

  @Reduces(UserProfileCreated)
  public static onUserProfileCreated(event: UserProfileCreated): UserProfile {
    return new UserProfile(event.id, event.alias, event.photoUrl)
  }

  @Reduces(UserProfileUpdated)
  public static onUserProfileUpdated(event: UserProfileUpdated, oldUserProfile: UserProfile): UserProfile {
    return {
      ...oldUserProfile,
      alias: event.alias,
      photoUrl: event.photoUrl,
    }
  }
}
