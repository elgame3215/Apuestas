import { amountsReqSchema } from '../amounts/req.amounts.dto.js';
import Joi from 'joi';

export const accountReqSchema = Joi.object({
	username: Joi.string().required(),
	amounts: amountsReqSchema,
});
