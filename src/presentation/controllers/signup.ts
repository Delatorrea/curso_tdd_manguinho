import { Controller, EmailValidator, httpResponse, httpRequest } from '@src/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@src/presentation/errors'
import { badRequest, serverError } from '@src/presentation/helpers/http-helper'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) { }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requiredFiled = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFiled) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return {
        statusCode: 200,
        body: {}
      }
    } catch (error) {
      return serverError()
    }
  }
}
