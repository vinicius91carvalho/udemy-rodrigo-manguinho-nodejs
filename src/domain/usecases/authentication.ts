import { AccountModel } from '../models/account'

export type AuthenticationModel = Pick<AccountModel, 'email' | 'password'>

export interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<string>
}
