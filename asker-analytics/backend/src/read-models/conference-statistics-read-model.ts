import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Word } from '../entities/word'

@ReadModel({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class ConferenceStats {
  public constructor(
    public id: UUID,
    readonly verbs: Record<string, number>,
    readonly nouns: Record<string, number>,
    readonly adjectives: Record<string, number>,
    readonly allWords: Record<string, number>
  ) {}

  @Projects(Word, 'conferenceId')
  public static projectWord(entity: Word, previous?: ConferenceStats): ProjectionResult<ConferenceStats> {
    const verbs = previous?.verbs ?? {}
    const nouns = previous?.nouns ?? {}
    const adjectives = previous?.adjectives ?? {}
    const allWords = previous?.allWords ?? {}
    const wordCount = allWords[entity.name] ?? 0

    allWords[entity.name] = wordCount + 1
    switch (entity.type) {
      case 'V':
        verbs[entity.name] = wordCount + 1
        break

      case 'N':
        nouns[entity.name] = wordCount + 1
        break

      case 'A':
        adjectives[entity.name] = wordCount + 1
        break

      default:
        break
    }

    return new ConferenceStats(entity.conferenceId, verbs, nouns, adjectives, allWords)
  }
}
