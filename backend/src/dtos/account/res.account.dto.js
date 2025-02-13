import Joi from 'joi';

export const accountResSchema = Joi.object({
	username: Joi.string().required(),
	amounts: Joi.object({
		betano: Joi.number().required(),
		bet365: Joi.number().required(),
	}),
});
