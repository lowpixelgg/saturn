import { Staff } from '../../domain/Staff'
import { IStaffReposiotry } from '../IStaffRepository'
import { ITimesRepository } from '../ITimesRepository'

export class InMemoryStaffRepository implements IStaffReposiotry {
  public items: Staff[] = []

  constructor(private timesRepository?: ITimesRepository) {}

  async findByUserID(id: string): Promise<Staff> {
    const index = this.items.findIndex(find => find.user_id === id)
    return this.items[index]
  }

  async exists(id: string) {
    const exists = this.items.find(find => find.user_id === id)

    return !!exists
  }

  async create(staff: Staff): Promise<void> {
    this.items.push(staff)
  }

  async save(staff: Staff): Promise<void> {
    const index = this.items.findIndex(find => find.id === staff.id)
    this.items[index] = staff

    if (this.timesRepository) {
      this.timesRepository.save(staff.times)
    }
  }

  async findById(id: string): Promise<Staff> {
    const index = this.items.findIndex(find => find.id === id)
    return this.items[index]
  }
}
