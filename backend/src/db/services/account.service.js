import { accountModel } from '../models/account.model.js';

export class AccountsService {
	static async deleteAccountByUsername(username) {
		return await accountModel
			.findOneAndDelete({ username }, { new: true })
			.lean();
	}
	static async getAccountByUsername(username) {
		return await accountModel.findOne({ username }).lean();
	}
	static async createAccount({ username }) {
		const newAccount = await accountModel.create({ username });
		return newAccount.toObject();
	}
	static async getAccounts() {
		const accounts = await accountModel.find().lean();
		return accounts;
	}

	static async updateAccountByUsername(username, account) {
		return await accountModel
			.findOneAndUpdate(
				{ username },
				{
					$set: {
						username: account.username,
						amounts: {
							betano: account.amounts.betano,
							bet365: account.amounts.bet365,
						},
					},
				},
				{ new: true }
			)
			.lean();
	}
}
