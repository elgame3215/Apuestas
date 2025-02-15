import Joi from 'joi';
import { mongoIdSchema } from '../mongo.id.dto.js';

let betReqSchema = Joi.object({
	description: Joi.string().trim().required(),
	accounts: Joi.array().items(mongoIdSchema).required(),
	amount: Joi.number().min(0).required(),
	odds: Joi.number().min(1).precision(2).positive().required(),
});

betReqSchema = betReqSchema.keys({ oppositeBet: betReqSchema });

export { betReqSchema };
