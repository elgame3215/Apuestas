import { model, Schema } from 'mongoose';

const accountSchema = new Schema({
	username: { type: String, required: true, unique: true },
	amounts: {
		betano: { type: Number, default: 0 },
		bet365: { type: Number, default: 0 },
	},
});

export const accountModel = model('account', accountSchema);
