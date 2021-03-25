import { QuestionCreated } from '../events/question-created'
import { WordPicked } from '../events/word-picked'
import { EventHandler } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'

@EventHandler(QuestionCreated)
export class SplitQuestionsIntoWords {
  public static async handle(event: QuestionCreated, register: Register): Promise<void> {
    const words = event.text.split(' ')
    for (const word in words) {
      register.events(new WordPicked(word, UUID.generate(), event.id, event.conferenceId))
    }
  }
}
