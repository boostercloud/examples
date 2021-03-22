import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { QuestionAsked } from '../events/question-asked'

@Entity
export class Question {
  public constructor(
    public id: UUID,
    readonly conferenceId: UUID,
    readonly questioner: string,
    readonly text: string,
    readonly likes: number
  ) {}

  @Reduces(QuestionAsked)
  public static reduceQuestionAsked(event: QuestionAsked): Question {
    return new Question(event.id, event.conference, event.questioner, event.text, 0)
  }
}
