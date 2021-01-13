import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignUpValidation()
  const signUpController = new SignUpController(makeDbAddAccount(), validationComposite, makeDbAuthentication())

  return makeLogControllerDecorator(signUpController)
}
