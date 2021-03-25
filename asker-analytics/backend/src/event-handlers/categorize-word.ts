import { WordPicked } from '../events/word-picked'
import { EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { WordCategorized } from '../events/word-categorized'

@EventHandler(WordPicked)
export class CategorizeWord {
  public static async handle(event: WordPicked, register: Register): Promise<void> {
    const wordType = await categorizeWord(event.name)
    register.events(new WordCategorized(event.name, wordType, event.id, event.questionId, event.conferenceId))
  }
}

async function categorizeWord(word: string) {
  const wordDictionary: Record<string, Array<string>> = require('../common/2of12id.json')
  const includedInCategory = async (category: string, word: string) =>
    wordDictionary[category].includes(word) ? category : null
  const nounCheck = includedInCategory('N', word)
  const verbCheck = includedInCategory('V', word)
  const adjectiveCheck = includedInCategory('A', word)
  const results = await Promise.all([nounCheck, verbCheck, adjectiveCheck])
  const categoryArray = results.filter((t): t is string => t != null)
  return categoryArray[0] ?? 'other'
}
