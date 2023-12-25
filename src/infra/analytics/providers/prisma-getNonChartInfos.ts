import { prisma } from '@infra/prisma/prisma-client';

export default async function getNonChartInfos() {
  const users = await prisma.user.findMany();
  const whitelists = await prisma.whitelist.findMany();
  const posts = await prisma.post.findMany();
  const comments = await prisma.comment.findMany();
  const likes = await prisma.likes.findMany();

  const pendingWhitelistUsers = await prisma.user.findMany({
    where: {
      status: 'TRIAGEM',
    },
  });

  const approvedWhitelists = await prisma.whitelist.findMany({
    where: {
      status: 'APROVADO',
    },
  });

  const reprovedWhitelists = await prisma.whitelist.findMany({
    where: {
      status: 'REPROVADO',
    },
  });

  const premiumUsers = await prisma.user.findMany({
    where: {
      isPremium: true,
    },
  });

  const interviewApprovedUsers = await prisma.user.findMany({
    where: {
      status: 'ENTREVISTADO',
    },
  });

  const interviewReprovedUsers = await prisma.user.findMany({
    where: {
      status: 'REPROVADO_ENTREVISTA',
    },
  });

  const verifiedUsers = await prisma.user.findMany({
    where: {
      isVerified: true,
    },
  });

  return {
    users: users.length,
    whitelists: whitelists.length,
    pendingWhitelistUsers: pendingWhitelistUsers.length,
    approvedWhitelists: approvedWhitelists.length,
    reprovedWhitelists: reprovedWhitelists.length,
    interviewApprovedUsers: interviewApprovedUsers.length,
    interviewReprovedUsers: interviewReprovedUsers.length,
    premiumUsers: premiumUsers.length,
    verifiedUsers: verifiedUsers.length,
    posts: posts.length,
    comments: comments.length,
    likes: likes.length,
  };
}
