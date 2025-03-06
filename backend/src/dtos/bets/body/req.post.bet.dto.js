import Joi from 'joi'
import { mongoIdSchema } from '../../mongo.id.dto.js'

let betPostReqSchema = Joi.object({
  group: Joi.string()
    .trim()
    .when('oppositeBet', {
      is: Joi.exist(),
      then: Joi.valid(Joi.ref('oppositeBet.group')).required(),
      otherwise: Joi.optional()
    }),
  description: Joi.string().trim().required(),
  accounts: Joi.array().items(mongoIdSchema).required(),
  amount: Joi.number().min(0).required(),
  odds: Joi.number().min(1).precision(2).positive().required(),
  isFreeBet: Joi.boolean().default(false)
})

betPostReqSchema = betPostReqSchema.keys({ oppositeBet: betPostReqSchema })

export { betPostReqSchema }
