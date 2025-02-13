import { accountListResSchema } from '../dtos/account/res.account.list.dto.js';
import { AccountNotFoundError } from '../errors/account.errors.js';
import { accountResSchema } from '../dtos/account/res.account.dto.js';
import { AccountsService } from '../db/services/account.service.js';
import { sendSuccess } from '../utils/custom.responses.js';

export class AccountsController {
	static async deleteAccountByUsername(req, res, next) {
		const { username } = req.params;
		try {
			const deletedAccount =
				await AccountsService.deleteAccountByUsername(username);
			if (!deletedAccount) {
				return next(new AccountNotFoundError());
			}
			return sendSuccess({
				res,
				next,
				code: 200,
				detail: 'Account deleted',
				payload: deletedAccount,
				dtoSchema: accountResSchema,
			});
		} catch (error) {
			return next(error);
		}
	}
	static async getAccountByUsername(req, res, next) {
		const { username } = req.params;

		try {
			const account = await AccountsService.getAccountByUsername(username);
			if (!account) {
				return next(new AccountNotFoundError());
			}
			return sendSuccess({
				res,
				next,
				code: 200,
				payload: account,
				dtoSchema: accountResSchema,
			});
		} catch (error) {
			return next(error);
		}
	}
	static async createAccount(req, res, next) {
		const { username } = req.body;
		try {
			const newAccount = await AccountsService.createAccount({ username });
			return sendSuccess({
				res,
				next,
				code: 201,
				detail: 'Account created',
				payload: newAccount,
				dtoSchema: accountResSchema,
			});
		} catch (error) {
			return next(error);
		}
	}

	static async getAccounts(req, res, next) {
		try {
			const accounts = await AccountsService.getAccounts();
			return sendSuccess({
				res,
				next,
				code: 200,
				payload: accounts,
				dtoSchema: accountListResSchema,
			});
		} catch (error) {
			return next(error);
		}
	}

	static async updateAccountByUsername(req, res, next) {
		try {
			const { username } = req.params;
			const account = req.body;
			const updatedAccount = await AccountsService.updateAccountByUsername(
				username,
				account
			);

			if (!updatedAccount) {
				return next(new AccountNotFoundError());
			}

			return sendSuccess({
				res,
				next,
				code: 200,
				payload: updatedAccount,
				dtoSchema: accountResSchema,
			});
		} catch (error) {
			return next(error);
		}
	}
}
