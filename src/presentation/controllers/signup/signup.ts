import { Controller, httpResponse, httpRequest, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '@src/presentation/errors'
import { badRequest, ok, serverError } from '@src/presentation/helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) { }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const requiredFiled = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFiled) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, name, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({ name, email, password })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
