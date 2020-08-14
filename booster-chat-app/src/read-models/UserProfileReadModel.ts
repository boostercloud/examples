import { ReadModel } from '@boostercloud/framework-core'
import { Projects } from '@boostercloud/framework-core'
import { User, Admin } from '../roles'
import { UserProfile } from '../entities/UserProfile'
import { UUID } from '@boostercloud/framework-types'

@ReadModel({
  authorize: [User, Admin],
})
export class UserProfileReadModel {
  public constructor(readonly id: UUID, readonly alias: string, readonly photoUrl: string) {}

  @Projects(UserProfile, 'id')
  public static onUserProfileUpdated(userProfile: UserProfile): UserProfileReadModel {
    return new UserProfileReadModel(userProfile.id, userProfile.alias, userProfile.photoUrl)
  }
}
