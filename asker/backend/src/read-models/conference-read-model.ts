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

  @Projects(Question, 'conferenceId')
  public static projectQuestion(
    entity: Question,
    currentConferenceReadModel?: ConferenceReadModel
  ): ProjectionResult<ConferenceReadModel> {
    if (!currentConferenceReadModel) {
      throw new Error('Someone asked a question in a non-existent Conference 😳. Who asked it 😒?')
    }

    const newAndSortedQuestions = currentConferenceReadModel.questions
      .filter(doesNotHaveId(entity.id)) // Remove the question if it was present
      .concat(entity) // Add the new question or the existing, removed, question with the latest information
      .sort(byClaps)
    return new ConferenceReadModel(
      currentConferenceReadModel.id,
      currentConferenceReadModel.location,
      newAndSortedQuestions
    )
  }
}

function doesNotHaveId(id: UUID): (question: Question) => boolean {
  return (question) => question.id != id
}

function byClaps(questionA: Question, questionB: Question): number {
  return questionB.claps - questionA.claps
}
