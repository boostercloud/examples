import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Conference } from '../entities/conference'
import { Question } from '../entities/question'

@ReadModel({
  authorize: 'all',
})
export class ConferenceReadModel {
  public constructor(public id: UUID, readonly location: string, readonly questions: Array<Question>) {}

  @Projects(Conference, 'id')
  public static projectConference(
    entity: Conference,
    currentConferenceReadModel?: ConferenceReadModel
  ): ProjectionResult<ConferenceReadModel> {
    if (!currentConferenceReadModel) {
      currentConferenceReadModel = new ConferenceReadModel(entity.id, entity.location, [])
    }
    return new ConferenceReadModel(currentConferenceReadModel.id, entity.location, currentConferenceReadModel.questions)
  }
}
