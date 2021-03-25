import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { QuestionCreated } from '../events/question-created'

@Command({
  authorize: 'all',
})
export class PostQuestion {
  public constructor(readonly conferenceId: UUID, readonly text: string) {}

  public static async handle(command: PostQuestion, register: Register): Promise<void> {
    register.events(new QuestionCreated(command.text, UUID.generate(), command.conferenceId))
  }
}
