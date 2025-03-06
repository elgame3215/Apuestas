import { BET_STATES } from '../../../constants/enums/index.js'
import Joi from 'joi'

export const betListQuerySchema = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(BET_STATES))
})
