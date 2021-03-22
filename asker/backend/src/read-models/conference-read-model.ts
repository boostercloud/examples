import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Conference } from '../entities/conference'
import { Question } from '../entities/question'

@ReadModel({
  authorize: 'all',
})
export class ConferenceReadModel {
  public constructor(public id: UUID, readonly name: string, readonly questions: Array<Question>) {}

  @Projects(Conference, 'id')
  public static projectConference(
    entity: Conference,
    currentConferenceReadModel?: ConferenceReadModel
  ): ProjectionResult<ConferenceReadModel> {
    if (!currentConferenceReadModel) {
      currentConferenceReadModel = new ConferenceReadModel(entity.id, entity.name, [])
    }
    return new ConferenceReadModel(currentConferenceReadModel.id, entity.name, currentConferenceReadModel.questions)
  }

  @Projects(Question, 'conferenceId')
  public static projectQuestion(
    entity: Question,
    currentConferenceReadModel?: ConferenceReadModel
  ): ProjectionResult<ConferenceReadModel> {
    if (!currentConferenceReadModel) {
      throw 'Someone asked a question in a non-existent Conference 😳. Who asked it 😒?'
    }

    const newAndSortedQuestions = currentConferenceReadModel.questions.concat(entity).sort(byLikes)
    return new ConferenceReadModel(
      currentConferenceReadModel.id,
      currentConferenceReadModel.name,
      newAndSortedQuestions
    )
  }
}

function byLikes(questionA: Question, questionB: Question): number {
  return questionB.likes - questionA.likes
}
