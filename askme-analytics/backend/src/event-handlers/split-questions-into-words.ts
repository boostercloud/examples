import { QuestionAsked } from '../events/question-asked'
import { WordPicked } from '../events/word-picked'
import { EventHandler } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'

@EventHandler(QuestionAsked)
export class SplitQuestionsIntoWords {
  public static async handle(event: QuestionAsked, register: Register): Promise<void> {
    const words = event.text
      .replace(/[^0-9a-zA-Z\s]/gi, '')
      .toLowerCase()
      .split(' ')
    const events = words.map((w) => new WordPicked(w, UUID.generate(), event.id, event.conferenceId))
    register.events(...events)
  }
}
