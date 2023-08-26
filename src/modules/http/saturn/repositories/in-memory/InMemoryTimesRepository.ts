import { Time } from '@modules/http/saturn/domain/Time'
import { Times } from '@modules/http/saturn/domain/Times'
import { ITimesRepository } from '../ITimesRepository'

export class InMemoryTimesRepository implements ITimesRepository {
  public items: Time[] = []

  async getWeekTimes(gt: string): Promise<Time[]> {
    const filteredItems = this.items.filter(time => {
      const timeDate = new Date(time.date)
      const gtDate = new Date(gt)

      return timeDate >= gtDate
    })

    return filteredItems
  }

  async save(times: Times): Promise<void> {
    this.items.push(...times.getNewItems())

    times.getRemovedItems().forEach(time => {
      const timeIndex = this.items.findIndex(timeItem => {
        return timeItem.id === time.id
      })

      this.items.splice(timeIndex, 1)
    })
  }

  async create(times: Times): Promise<void> {
    this.items.push(...times.getItems())
  }

  async getWeekTimeById(timeId: string): Promise<Time> {
    const index = this.items.findIndex(time => time.id === timeId)
    return this.items[index]
  }

  async saveSingle(time: Time): Promise<void> {
    const index = this.items.findIndex(time => time.id === time.id)
    this.items[index] = time
  }
}
