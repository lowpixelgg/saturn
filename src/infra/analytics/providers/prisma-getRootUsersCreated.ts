import { prisma } from '@infra/prisma/prisma-client';
import _ from 'lodash';

export default async function getUsersCreated(): Promise<
  Array<{ date: string; Cadastros: number }>
> {
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  const results = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: twoMonthsAgo,
      },
    },
  });

  const dailyCounts = _.groupBy(results, user => {
    const date = new Date(user.createdAt);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  const dailyCountsArray: Array<{ date: string; Cadastros: number }> = [];
  for (let i = 1; i <= currentDay; i++) {
    const date = `${i}/${currentMonth + 1}`;
    const Cadastros = dailyCounts[date] ? dailyCounts[date].length : 0;
    dailyCountsArray.push({ date, Cadastros });
  }

  return dailyCountsArray;
}
