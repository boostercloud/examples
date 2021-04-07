import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Question } from '../entities/question'

@ReadModel({
  authorize: 'all',
})
export class QuestionReadModel {
  public constructor(
    public id: UUID,
    readonly askedOn: string,
    readonly conferenceId: UUID,
    readonly questioner: string,
    readonly text: string,
    readonly likes: number,
    readonly createdAt: string
  ) {}

  @Projects(Question, 'id')
  public static projectQuestion(entity: Question): ProjectionResult<QuestionReadModel> {
    return new QuestionReadModel(
      entity.id,
      entity.askedOn,
      entity.conferenceId,
      entity.questioner,
      entity.text,
      entity.likes,
      entity.createdAt
    )
  }
}
