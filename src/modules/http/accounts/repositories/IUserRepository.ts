import { User } from '@modules/http/accounts/domain/user/user'

export interface IUserRepository {
  exists(email: string): Promise<boolean>
  findOne(email: string): Promise<User>
  create(dto: User): Promise<void>
  save(user: User): Promise<void>

  // // activate account
  // createActivationToken(userid: string): Promise<activation_token>
  // markActivationTokenHasUsed(token: string): Promise<void>
  // findOneActivationToken(token: string): Promise<activation_token>

  // // recovery password
  // createRecoveryToken(userid: string): Promise<recovery_token>
  // markRecoveryToken(token: string): Promise<void>
  // findOneRecoveryToken(token: string): Promise<recovery_token>
}
