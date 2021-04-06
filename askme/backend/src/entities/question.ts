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
<<<<<<< HEAD:asker/backend/src/entities/question.ts
    readonly createdAt: string
=======
    readonly createdAt: string,
>>>>>>> changed claps by likes:askme/backend/src/entities/question.ts
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
<<<<<<< HEAD:asker/backend/src/entities/question.ts
      throw new Error('Someone liked a question that does not exist')
=======
      throw new Error('Someone set a like on a question that does not exist')
>>>>>>> changed claps by likes:askme/backend/src/entities/question.ts
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
