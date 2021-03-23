import { Booster, Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { Conference } from '../entities/conference'
import { ConferenceCreated } from '../events/conference-created'

@Command({
  authorize: 'all',
})
export class CreateConference {
  public constructor(readonly name: string, readonly location: string) {}

  public static async handle(command: CreateConference, register: Register): Promise<void> {
    const conference = await Booster.entity(Conference, command.name)
    if (conference) {
      throw new Error(`There is already a conference called ${command.name}. Please use a different name`)
    }
    register.events(new ConferenceCreated(command.name, command.location))
  }
}
