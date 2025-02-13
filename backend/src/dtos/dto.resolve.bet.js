import Joi from 'joi';

export const resolveBetRequestSchema = Joi.object({
	betSuccess: Joi.boolean().required(),
	range: Joi.string().trim().required(),
});
