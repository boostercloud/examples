import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { QuestionLiked } from '../events/question-liked'

@Command({
  authorize: 'all',
})
export class Like {
  public constructor(readonly questionId: UUID, readonly byWhom: string) {}

  public static async handle(command: Like, register: Register): Promise<void> {
    if (!command.byWhom) {
      throw new Error('Please tell us who is liking the question. Field "byWhom" is empty')
    }
    register.events(new QuestionLiked(command.questionId, command.byWhom))
  }
}
