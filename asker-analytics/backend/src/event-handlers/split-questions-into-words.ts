import { QuestionCreated } from '../events/question-created'
import { EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'

@EventHandler(QuestionCreated)
export class SplitQuestionsIntoWords {
  public static async handle(event: QuestionCreated, register: Register): Promise<void> {}
}
