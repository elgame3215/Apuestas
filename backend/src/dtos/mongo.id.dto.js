import Joi from 'joi'
import { validateMongoId } from './utils.js'

export const mongoIdSchema = Joi.any().custom(validateMongoId)
