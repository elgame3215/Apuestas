import { accountResSchema } from '../../account/res.account.dto.js'
import { BET_STATES } from '../../../constants/enums/index.js'
import { betPostReqSchema } from './req.post.bet.dto.js'
import Joi from 'joi'
import { mongoIdSchema } from '../../mongo.id.dto.js'

let betResSchema = betPostReqSchema.keys({
  group: Joi.string().trim(),
  accounts: Joi.array().items(accountResSchema).required(),
  status: Joi.string().valid(...Object.values(BET_STATES)),
  id: mongoIdSchema.required(),
  isFreeBet: Joi.boolean().required(),
  pay: Joi.number().min(0).required()
})

betResSchema = betResSchema.keys({
  oppositeBet: betResSchema
})

export { betResSchema }
