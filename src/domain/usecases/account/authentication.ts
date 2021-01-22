import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'

export type AuthenticationParams = Pick<AccountModel, 'email' | 'password'>

export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationModel>
}
