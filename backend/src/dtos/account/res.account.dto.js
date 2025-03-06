import Joi from 'joi'
import { mongoIdSchema } from '../mongo.id.dto.js'

export const accountResSchema = Joi.object({
  username: Joi.string().required(),
  amounts: Joi.object({
    betano: Joi.number().required(),
    bet365: Joi.number().required()
  }),
  id: mongoIdSchema.required()
})
