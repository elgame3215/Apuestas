import { betResSchema } from './res.bet.dto.js';
import Joi from 'joi';

export const betListResSchema = Joi.array().items(betResSchema);
