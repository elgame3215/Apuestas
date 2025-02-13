import { accountResSchema } from './res.account.dto.js';
import Joi from 'joi';

export const accountListResSchema = Joi.array().items(accountResSchema);
