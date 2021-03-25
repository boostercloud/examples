import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Word } from '../entities/word'

@ReadModel({
  authorize: 'all' // Specify authorized roles here. Use 'all' to authorize anyone
})
export class ConferenceStatisticsReadModel {
  public constructor(
    public id: UUID,
    readonly verbs: number,
    readonly noums: number,
    readonly adjectives: number,
    readonly interjections: number,
    readonly pronouns: number,
    readonly conjuctionPrepositions: number,
    readonly spokenContractions: number,
  ) {}

  @Projects(Word, "conferenceId")
  public static projectWord(entity: Word, currentConferenceStatisticsReadModel?: ConferenceStatisticsReadModel): ProjectionResult<ConferenceStatisticsReadModel> {
    if (!currentConferenceStatisticsReadModel) {
      currentConferenceStatisticsReadModel = new ConferenceStatisticsReadModel(entity.conferenceId,0,0,0,0,0,0,0)
    }
    let verbs = currentConferenceStatisticsReadModel.verbs
    let noums = currentConferenceStatisticsReadModel.noums
    let adjectives = currentConferenceStatisticsReadModel.adjectives
    let interjections = currentConferenceStatisticsReadModel.interjections
    let pronouns = currentConferenceStatisticsReadModel.pronouns
    let conjuctionPrepositions = currentConferenceStatisticsReadModel.conjuctionPrepositions
    let spokenContractions = currentConferenceStatisticsReadModel.spokenContractions
    if (entity.type === 'TODO') {
      verbs += 1
    }
    return new ConferenceStatisticsReadModel(
      entity.conferenceId, 
      verbs, 
      noums, 
      adjectives, 
      interjections, 
      pronouns, 
      conjuctionPrepositions, 
      spokenContractions
      )
  }

}
