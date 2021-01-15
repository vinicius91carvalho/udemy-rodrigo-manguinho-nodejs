import { AccountModel, AddAccount, AddAccountParams, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (account: AddAccountParams): Promise<AccountModel> {
    const loadedAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email)

    if (!loadedAccount) {
      const hashedPassword = await this.hasher.hash(account.password)

      return this.addAccountRepository.add({
        ...account,
        password: hashedPassword
      })
    }
    return null
  }
}
