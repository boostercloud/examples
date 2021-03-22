import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { Question } from '../entities/question'
import { QuestionClapped } from '../events/question-clapped'

@Command({
  authorize: 'all',
})
export class Clap {
  public constructor(readonly questionId: UUID, readonly byWhom: string) {}

  public static async handle(command: Clap, register: Register): Promise<void> {
    const question = Booster.fetchEntitySnapshot(Question, command.questionId)
    if (question) {
      throw new Error(
        `You are trying to clap a question that doesn't exist 🤔. Question with id ${command.questionId} not found`
      )
    }
    register.events(new QuestionClapped(command.questionId, command.byWhom))
  }
}
