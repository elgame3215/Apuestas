import Joi from 'joi'

export const resolveBetReqSchema = Joi.object({
  betResult: Joi.string().valid('won', 'lost').required()
})
