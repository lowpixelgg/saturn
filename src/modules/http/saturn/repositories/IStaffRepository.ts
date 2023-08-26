import { Staff } from '../domain/Staff'

export interface IStaffReposiotry {
  findById(id: string): Promise<Staff>
  findByUserID(id: string): Promise<Staff>
  exists(id: string): Promise<boolean>
  create(staff: Staff): Promise<void>
  save(staff: Staff): Promise<void>
}
