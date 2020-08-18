import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PostCreated } from '../events/PostCreated'

@Command({
  authorize: 'all',
})
export class CreatePost {
  public constructor(
    readonly postId: UUID,
    readonly title: string,
    readonly content: string,
    readonly author: string
  ) {}

  public async handle(register: Register): Promise<void> {
    register.events(new PostCreated(this.postId, this.title, this.content, this.author))
  }
}
