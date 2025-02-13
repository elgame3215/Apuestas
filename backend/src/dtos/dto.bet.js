import Joi from 'joi';

export const betSchema = Joi.object({
	amount: Joi.number().min(0).required(),
	description: Joi.string().required(),
	odds: Joi.number().min(1).required(),
	accounts: Joi.array().required(),
});
