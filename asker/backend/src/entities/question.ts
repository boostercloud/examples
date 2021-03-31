import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { QuestionAsked } from '../events/question-asked'
import { QuestionClapped } from '../events/question-clapped'

@Entity
export class Question {
  public constructor(
    public id: UUID,
    readonly askedOn: string,
    readonly conferenceId: UUID,
    readonly questioner: string,
    readonly text: string,
    readonly claps: number,
    readonly createdAt: string,
  ) {}

  @Reduces(QuestionAsked)
  public static reduceQuestionAsked(event: QuestionAsked): Question {
    return new Question(event.questionId, event.when, event.conference, event.questioner, event.text, 0, new Date().toISOString())
  }

  @Reduces(QuestionClapped)
  public static reduceQuestionClapped(event: QuestionClapped, currentQuestion?: Question): Question {
    if (!currentQuestion) {
      throw new Error('Someone clapped a question that does not exist')
    }
    return new Question(
      currentQuestion.id,
      currentQuestion.askedOn,
      currentQuestion.conferenceId,
      currentQuestion.questioner,
      currentQuestion.text,
      currentQuestion.claps + 1,
      currentQuestion.createdAt
    )
  }
}
