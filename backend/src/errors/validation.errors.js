import { CustomError } from './CustomError.js'

export class DtoError extends CustomError {
  constructor (dtoError) {
    super(dtoError.details[0].message, 400)
  }
}
