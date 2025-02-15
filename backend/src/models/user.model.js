import { POLICIES } from '../constants/enums/index.js';
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			required: true,
		},
		rol: {
			type: String,
			default: POLICIES.USER,
		},
		googleID: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{
		id: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.index({ firstName: 'text' });

export const userModel = model('user', userSchema);
