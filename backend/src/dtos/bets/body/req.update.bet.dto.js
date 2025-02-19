import Joi from 'joi';
import { mongoIdSchema } from '../../mongo.id.dto.js';

let betUpdateReqSchema = Joi.object({
	description: Joi.string().trim(),
	accounts: Joi.array().items(mongoIdSchema),
	amount: Joi.number().min(0),
	odds: Joi.number().min(1).precision(2).positive(),
});

betUpdateReqSchema = betUpdateReqSchema.keys({
	oppositeBet: betUpdateReqSchema,
});

export { betUpdateReqSchema };
