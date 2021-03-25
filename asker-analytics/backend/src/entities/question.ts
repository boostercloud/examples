import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { QuestionCreated } from '../events/question-created'

@Entity
export class Question {
  public constructor(
    public id: UUID,
    readonly conferenceId: UUID,
    readonly text: string,
  ) {}

  @Reduces(QuestionCreated)
  public static reduceQuestionCreated(event: QuestionCreated, currentQuestion?: Question): Question {
    return new Question(event.id, event.conferenceId, event.text)
  }

}
