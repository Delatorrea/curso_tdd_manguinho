import { httpRequest, httpResponse } from '@src/presentation/protocols/http'

export interface Controller {
  handle: (httpRequest: httpRequest) => httpResponse
}
