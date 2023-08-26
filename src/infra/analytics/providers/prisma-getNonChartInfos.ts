import { prisma } from '@infra/prisma/prisma-client'

export default async function getNonChartInfos() {
  const users = await prisma.user.findMany()
  const whitelists = await prisma.whitelist.findMany()
  const posts = await prisma.post.findMany()
  const comments = await prisma.comment.findMany()
  const likes = await prisma.likes.findMany()

  const approvedWhitelists = await prisma.whitelist.findMany({
    where: {
      status: 'APROVADO',
    },
  })

  const reprovedWhitelists = await prisma.whitelist.findMany({
    where: {
      status: 'REPROVADO',
    },
  })

  const premiumUsers = await prisma.user.findMany({
    where: {
      isPremium: true,
    },
  })

  const verifiedUsers = await prisma.user.findMany({
    where: {
      isVerified: true,
    },
  })

  return {
    users: users.length,
    whitelists: whitelists.length,
    approvedWhitelists: approvedWhitelists.length,
    reprovedWhitelists: reprovedWhitelists.length,
    premiumUsers: premiumUsers.length,
    verifiedUsers: verifiedUsers.length,
    posts: posts.length,
    comments: comments.length,
    likes: likes.length,
  }
}
