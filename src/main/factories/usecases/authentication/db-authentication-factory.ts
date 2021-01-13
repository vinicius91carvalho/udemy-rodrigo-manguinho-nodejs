import env from '@/main/config/env'
import { Authentication } from '@/domain/usecases/authentication'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { BCryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bCryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  return new DbAuthentication(
    accountMongoRepository,
    bCryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
