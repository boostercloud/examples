import { QuestionCreated } from '../events/question-created'
import { WordPicked } from '../events/word-picked'
import { EventHandler } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'

@EventHandler(QuestionCreated)
export class SplitQuestionsIntoWords {
  public static async handle(event: QuestionCreated, register: Register): Promise<void> {
<<<<<<< HEAD
    const words = event.text
      .replace(/[^0-9a-zA-Z\s]/gi, '')
      .toLowerCase()
      .split(' ')
    const events = words.map((w) => new WordPicked(w, UUID.generate(), event.id, event.conferenceId))
=======
    const words = event.text.replace('?','').split(' ')
    const events = words.map(w => new WordPicked(w, UUID.generate(), event.id, event.conferenceId))
>>>>>>> enhance event handler
    register.events(...events)
  }
}
