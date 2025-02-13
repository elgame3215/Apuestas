import { model, Schema } from 'mongoose';

const betSchema = new Schema({
	accounts: [{ type: Schema.Types.ObjectId, ref: 'account' }],
	amount: { type: Number, required: true },
	odds: {type: Number, required: true},
});

export const betModel = model('bet', betSchema);
