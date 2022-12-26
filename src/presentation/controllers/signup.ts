import { Controller, EmailValidator, httpResponse, httpRequest } from '@src/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@src/presentation/errors'
import { badRequest, serverError } from '@src/presentation/helpers/http-helper'
import { AddAccount } from '@src/domain/usecases/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) { }

  handle (httpRequest: httpRequest): httpResponse {
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
      this.addAccount.add({ name, email, password })
      return {
        statusCode: 200,
        body: {}
      }
    } catch (error) {
      return serverError()
    }
  }
}
