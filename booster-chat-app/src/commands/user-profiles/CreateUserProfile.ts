import { Command, Booster } from '@boostercloud/framework-core'
import { User, Admin } from '../../roles'
import { Register } from '@boostercloud/framework-types'
import { UserProfileCreated } from '../../events/user-profiles/UserProfileCreated'
import { UserProfile } from '../../entities/UserProfile'

@Command({
  authorize: [User, Admin],
})
export class CreateUserProfile {
  public constructor(readonly alias: string, readonly photoUrl: string) {}

  public async handle(register: Register): Promise<void> {
    if (register.currentUser) {
      const userProfile = await Booster.fetchEntitySnapshot(UserProfile, register.currentUser.email)

      if (userProfile) {
        throw `Error creating user profile with email ${register.currentUser.email}. User profile already exists.`
      }
      register.events(new UserProfileCreated(register.currentUser.email, this.alias, this.photoUrl))
    }
  }
}
