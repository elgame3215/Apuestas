import { POLICIES } from '../../constants/enums/policies.js';
import { model, Schema } from 'mongoose';

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	rol: {
		type: String,
		required: true,
		default: POLICIES.USER,
	},
	googleID: {
		type: String,
		unique: true,
		required: true,
	},
	googleRefreshToken: {
		type: String,
		required: true,
	},
});

export const userModel = model('user', userSchema);
