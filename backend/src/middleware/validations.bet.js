import { AccountNotFoundError } from '../errors/account.errors.js';
import { AccountsService } from '../services/account.service.js';

export async function validateBetAccounts(req, res, next) {
	const { accounts: ids } = req.body;
	const accounts = await AccountsService.getAccounts();

	if (!ids.every(id => accounts.map(account => account.id).includes(id))) {
		return next(new AccountNotFoundError());
	}
	return next();
}
