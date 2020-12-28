import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../validation/validators'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter'

export const makeLoginValidation = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
