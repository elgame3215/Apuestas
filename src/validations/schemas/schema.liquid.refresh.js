import { CONFIG } from '../../config/config.js';
import Joi from 'joi';

const valueItemSchema = Joi.object({
	account: Joi.string().allow(...CONFIG.USERS).required(),
	newBetanoAmount: Joi.number().min(0).required(),
	newBet365Amount: Joi.number().min(0).required(),
});

export const liquidRefreshRequestSchema = Joi.object({
	values: Joi.array().min(1).items(valueItemSchema),
});

