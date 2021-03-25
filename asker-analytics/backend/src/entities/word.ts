import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { WordPicked } from '../events/word-picked'

@Entity
export class Word {
  public constructor(
    public id: UUID,
    readonly name: string,
    readonly questionId: UUID,
    readonly conferenceId: UUID,
    readonly type: string,
  ) {}

  @Reduces(WordPicked)
  public static reduceWordPicked(event: WordPicked, currentWord?: Word): Word {
    const type: string = 'TODO'
    return new Word(event.id, event.name, event.questionId, event.conferenceId, type)
  }

}
