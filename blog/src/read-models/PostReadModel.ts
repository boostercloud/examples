import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { Post } from '../entities/Post'

@ReadModel({
  authorize: 'all',
})
export class PostReadModel {
  public constructor(public id: UUID, readonly title: string, readonly author: string) {}

  @Projects(Post, 'postId')
  public static projectPost(entity: Post, currentPostReadModel?: PostReadModel): PostReadModel {
    return new PostReadModel(entity.id, entity.title, entity.author)
  }
}
