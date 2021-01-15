import { AccountModel } from '@/domain/models/account'

export type AuthenticationParams = Pick<AccountModel, 'email' | 'password'>

export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<string>
}
