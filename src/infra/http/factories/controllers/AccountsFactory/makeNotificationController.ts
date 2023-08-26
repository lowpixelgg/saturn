import { PrismaNotificationsRepository } from '@modules/http/accounts/repositories/prisma/PrismaNotificationsRepository'
import { MarkNotificationAsRead } from '@modules/http/accounts/useCases/MarkNotificationAsRead/MarkNotificationAsRead'
import { MarkNotificationAsReadController } from '@modules/http/accounts/useCases/MarkNotificationAsRead/MarkNotificationAsReadController'
import { Controller } from '@core/infra/Controller'

export function makeNotificationController(): Controller {
  const repository = new PrismaNotificationsRepository()
  const useCase = new MarkNotificationAsRead(repository)
  const controller = new MarkNotificationAsReadController(useCase)

  return controller
}
