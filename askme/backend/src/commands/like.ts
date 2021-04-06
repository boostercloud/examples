import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { Question } from '../entities/question'
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
    const question = await Booster.entity(Question, command.questionId)
    if (!question) {
      throw new Error(
        `You are trying to like a question that doesn't exist 🤔. Question with id ${command.questionId} not found`
      )
    }
    register.events(new QuestionLiked(command.questionId, command.byWhom))
  }
}
