import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { QuestionAsked } from '../events/question-asked'
import { WordPicked } from '../events/word-picked'

@Entity
export class Conference {
  public constructor(public id: UUID) {}

  @Reduces(QuestionAsked)
  public static reduceQuestionCreated(event: QuestionAsked, _currentConference?: Conference): Conference {
    return new Conference(event.conferenceId)
  }

  @Reduces(WordPicked)
  public static reduceWordPicked(event: WordPicked, _currentConference?: Conference): Conference {
    return new Conference(event.conferenceId)
  }
}
