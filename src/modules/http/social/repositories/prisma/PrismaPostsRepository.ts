import { Post } from '@modules/http/social/domain/timeline/Post'
import { PostMapper } from '@modules/http/social/mappers/PostMapper'
import { prisma } from '@infra/prisma/prisma-client'
import ICommentsRepository from '../ICommentsRepository'
import ILikesRepository from '../ILikesRepository'
import { IPostsRepository, SearchResponse } from '../IPostsRespository'

export class PrismaPostsRepository implements IPostsRepository {
  constructor(
    private likesRepository?: ILikesRepository,
    private commentsRepository?: ICommentsRepository
  ) {}

  async delete(raw: Post): Promise<void> {
    if (this.likesRepository) {
      await this.likesRepository.save(raw.Likes)
    }

    if (this.commentsRepository) {
      await this.commentsRepository.save(raw.Comments)
    }

    await prisma.post.delete({
      where: {
        id: raw.id,
      },
    })
  }

  async exists(postId: string): Promise<boolean> {
    const dbQuery = await prisma.post.findUnique({ where: { id: postId } })

    return !!dbQuery
  }

  async findOne(postId: string): Promise<Post> {
    const dbQuery = await prisma.post.findUnique({
      where: { id: postId },
      include: { Likes: true, Comment: { orderBy: { createdAt: 'desc' } } },
    })

    return PostMapper.toDomain(dbQuery)
  }

  async findAll(): Promise<Post[]> {
    const dbQuery = await prisma.post.findMany({
      include: { Likes: true, Comment: { orderBy: { createdAt: 'desc' } } },
    })

    return dbQuery.map(post => PostMapper.toDomain(post))
  }

  async save(raw: Post): Promise<void> {
    const data = PostMapper.toPersistence(raw)

    await prisma.post.update({
      where: { id: raw.id },
      data,
    })

    if (this.likesRepository) {
      await this.likesRepository.save(raw.Likes)
    }

    if (this.commentsRepository) {
      await this.commentsRepository.save(raw.Comments)
    }
  }

  async create(post: Post): Promise<void> {
    const data = PostMapper.toPersistence(post)
    await prisma.post.create({ data })
  }

  async search(
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse> {
    const queryPayload = {
      take: perPage,
      skip: (page - 1) * perPage || 0,
      where: {},
    }

    if (query) {
      queryPayload.where = {
        authorId: { contains: query, mode: 'insensitive' },
      }
    }

    const posts = await prisma.post.findMany({
      ...queryPayload,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Likes: true,
        Comment: { orderBy: { createdAt: 'desc' } },
      },
    })

    const postsCount = await prisma.post.aggregate({
      _count: true,
      where: queryPayload.where,
    })

    return {
      data: posts.map(post => PostMapper.toDomain(post)),
      totalCount: postsCount._count,
    }
  }

  async engressUserFeed(
    followUpIds: string[],
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse> {
    const queryPayload = {
      take: perPage,
      skip: (page - 1) * perPage || 0,
      where: {},
    }

    queryPayload.where = {
      authorId: {
        in: [...followUpIds, query],
      },
    }

    const posts = await prisma.post.findMany({
      ...queryPayload,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Likes: true,
        Comment: { orderBy: { createdAt: 'desc' } },
      },
    })

    const postsCount = await prisma.post.aggregate({
      _count: true,
      where: queryPayload.where,
    })

    return {
      data: posts.map(post => PostMapper.toDomain(post)),
      totalCount: postsCount._count,
    }
  }
}
