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
<<<<<<< HEAD:asker/backend/src/commands/like.ts
      throw new Error('Please tell us who is liking the question. Field "byWhom" is empty')
=======
      throw new Error('Please tell us who likes the question. Field "byWhom" is empty')
>>>>>>> changed claps by likes:askme/backend/src/commands/like.ts
    }
    const question = await Booster.entity(Question, command.questionId)
    if (!question) {
      throw new Error(
<<<<<<< HEAD:asker/backend/src/commands/like.ts
        `You are trying to like a question that doesn't exist 🤔. Question with id ${command.questionId} not found`
=======
        `You are trying to set a like on a question that doesn't exist 🤔. Question with id ${command.questionId} not found`
>>>>>>> changed claps by likes:askme/backend/src/commands/like.ts
      )
    }
    register.events(new QuestionLiked(command.questionId, command.byWhom))
  }
}
