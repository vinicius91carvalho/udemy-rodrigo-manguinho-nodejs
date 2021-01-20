import { badRequest, serverError, unauthorized, notFound, forbidden } from './components/'
import schemas from './schemas'

export default {
  securitySchemes: {
    apiKeyAuth: schemas.apiKeyAuth
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}
