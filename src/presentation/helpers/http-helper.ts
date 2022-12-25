import { httpResponse } from '@src/presentation/protocols/http'

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error
})
