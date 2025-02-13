import Joi from 'joi';

export const amountsReqSchema = Joi.object({
	betano: Joi.number().min(0),
	bet365: Joi.number().min(0),
});
