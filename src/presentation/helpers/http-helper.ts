import { httpResponse } from '@src/presentation/protocols/http'
import { ServerError } from '@src/presentation/errors/server-error'

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): httpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
