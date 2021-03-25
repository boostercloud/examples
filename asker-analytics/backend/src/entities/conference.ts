import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { QuestionCreated } from '../events/question-created'
import { WordPicked } from '../events/word-picked'

@Entity
export class Conference {
  public constructor(public id: UUID) {}

  @Reduces(QuestionCreated)
  public static reduceQuestionCreated(event: QuestionCreated, _currentConference?: Conference): Conference {
    return new Conference(event.conferenceId)
  }

  @Reduces(WordPicked)
  public static reduceWordPicked(event: WordPicked, _currentConference?: Conference): Conference {
    return new Conference(event.conferenceId)
  }
}
