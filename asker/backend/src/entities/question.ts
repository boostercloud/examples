import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { QuestionAsked } from '../events/question-asked'
import { QuestionLiked } from '../events/question-liked'

@Entity
export class Question {
  public constructor(
    public id: UUID,
    readonly askedOn: string,
    readonly conferenceId: UUID,
    readonly questioner: string,
    readonly text: string,
    readonly likes: number,
    readonly createdAt: string
  ) {}

  @Reduces(QuestionAsked)
  public static reduceQuestionAsked(event: QuestionAsked): Question {
    return new Question(
      event.questionId,
      event.when,
      event.conference,
      event.questioner,
      event.text,
      0,
      new Date().toISOString()
    )
  }

  @Reduces(QuestionLiked)
  public static reduceQuestionLiked(event: QuestionLiked, currentQuestion?: Question): Question {
    if (!currentQuestion) {
      throw new Error('Someone liked a question that does not exist')
    }
    return new Question(
      currentQuestion.id,
      currentQuestion.askedOn,
      currentQuestion.conferenceId,
      currentQuestion.questioner,
      currentQuestion.text,
      currentQuestion.likes + 1,
      currentQuestion.createdAt
    )
  }
}
