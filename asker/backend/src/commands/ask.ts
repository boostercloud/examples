import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { Conference } from '../entities/conference'
import { QuestionAsked } from '../events/question-asked'

@Command({
  authorize: 'all',
})
export class Ask {
  public constructor(
    readonly who: string,
    readonly question: string,
    readonly conference: UUID,
    readonly questionId: UUID
  ) {}

  public static async handle(command: Ask, register: Register): Promise<void> {
    if (!command.who) {
      throw new Error('Please, tell us who is asking the question 🙂. Field "who" is empty')
    }
    if (!command.question) {
      throw new Error('Did you submit an empty question 🤨. Field "question" is empty')
    }
    const conference = await Booster.entity(Conference, command.conference)
    if (!conference) {
      throw new Error(
        `There are no registered conferences called ${command.conference}. Please, ask questions in an existing conference`
      )
    }

    const questionId = command.questionId ?? UUID.generate()
    register.events(
      new QuestionAsked(questionId, new Date().toISOString(), command.who, command.conference, command.question)
    )
  }
}
