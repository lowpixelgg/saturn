import PrismaGetRootUsers from '@infra/analytics/providers/prisma-getRootUsersCreated'
import PrismaGetRootPosts from '@infra/analytics/providers/prisma-getRootPostsCreated'
import PrismaNonChartInfos from '@infra/analytics/providers/prisma-getNonChartInfos'

import express from 'express'

const Analytics = express.Router()

Analytics.get('/analytics/root', async (req, res) =>
  res.json({
    static: await PrismaNonChartInfos(),
    users: await PrismaGetRootUsers(),
    posts: await PrismaGetRootPosts(),
  })
)

export { Analytics }
