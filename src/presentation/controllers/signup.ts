import { httpResponse, httpRequest } from '@src/presentation/protocols/http'
import { MissingParamError } from '@src/presentation/errors/missing-param-error'
import { badRequest } from '@src/presentation/helpers/http-helper'

export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse {
    const requiredFiled = ['name', 'email']
    for (const field of requiredFiled) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return {
      statusCode: 200,
      body: {}
    }
  }
}
