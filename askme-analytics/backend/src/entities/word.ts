import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { WordCategorized } from '../events/word-categorized'

@Entity
export class Word {
  public constructor(
    public id: UUID,
    readonly name: string,
    readonly questionId: UUID,
    readonly conferenceId: UUID,
    readonly type: string,
    readonly numberOfAppearances: number
  ) {}

  @Reduces(WordCategorized)
  public static reduceWordPicked(event: WordCategorized, currentWord?: Word): Word {
    const count = currentWord?.numberOfAppearances ?? 0
    return new Word(event.id, event.name, event.questionId, event.conferenceId, event.wordType, count + 1)
  }
}
