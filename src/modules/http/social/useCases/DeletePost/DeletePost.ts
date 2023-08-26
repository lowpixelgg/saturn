import { IPostsRepository } from '@modules/http/social/repositories/IPostsRespository'
import { Either, left, right } from '@core/logic/Either'
import { PostDoesNotExist } from './errors/PostDoesNotExist'

type DeletePostRequest = {
  postId: string
}

type DeletePostResponse = Either<PostDoesNotExist, boolean>

export class DeletePost {
  constructor(private postsRepository: IPostsRepository) { }

  async execute({ postId }: DeletePostRequest): Promise<DeletePostResponse> {
    const exists = await this.postsRepository.exists(postId)

    if (!exists) {
      return left(new PostDoesNotExist())
    }

    const post = await this.postsRepository.findOne(postId)

    post.Comments.getItems().map(comment => post.removeComment(comment))
    post.Likes.getItems().map(like => post.deslike(like))

    await this.postsRepository.delete(post)



    return right(true)
  }
}
