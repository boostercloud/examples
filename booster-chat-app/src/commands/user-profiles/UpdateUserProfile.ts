import { Command } from '@boostercloud/framework-core'
import { User, Admin } from '../../roles'
import { Register } from '@boostercloud/framework-types'
import { UserProfileUpdated } from '../../events/user-profiles/UserProfileUpdated'
import { Booster } from '@boostercloud/framework-core/dist/booster'
import { UserProfile } from '../../entities/UserProfile'

@Command({
  authorize: [User, Admin],
})
export class UpdateUserProfile {
  public constructor(readonly alias: string, readonly photoUrl: string) {}

  public async handle(register: Register): Promise<void> {
    if (register.currentUser) {
      const userProfile = await Booster.fetchEntitySnapshot(UserProfile, register.currentUser.email)
      if (!userProfile) {
        throw `Error updating user profile with email ${register.currentUser.email}. User profile not found.`
      }
      register.events(new UserProfileUpdated(register.currentUser.email, this.alias, this.photoUrl))
    }
  }
}
