import { accountResSchema } from '../account/res.account.dto.js';
import { BET_STATES } from '../../constants/enums/index.js';
import { betReqSchema } from './req.bet.dto.js';
import Joi from 'joi';
import { mongoIdSchema } from '../mongo.id.dto.js';

let betResSchema = betReqSchema.keys({
	accounts: Joi.array().items(accountResSchema).required(),
	status: Joi.string().valid(...Object.values(BET_STATES)),
	id: mongoIdSchema.required(),
});

betResSchema = betResSchema.keys({
	oppositeBet: betResSchema,
});

export { betResSchema };
