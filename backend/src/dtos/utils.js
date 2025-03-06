import { InvalidMongoIDError } from '../errors/mongo.errors.js'
import { isValidObjectId } from 'mongoose'

export function validateMongoId (val) {
  if (!isValidObjectId(val)) {
    throw new InvalidMongoIDError()
  }
  return val
}
