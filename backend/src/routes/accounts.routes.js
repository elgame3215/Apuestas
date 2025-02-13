import { accountReqSchema } from '../dtos/account/req.account.dto.js';
import { AccountsController } from '../controllers/accounts.controller.js';
import { POLICIES } from '../constants/enums/policies.js';
import { Router } from './router.js';
import { validate } from 'express-joi-validations';

class AccountsRouter extends Router {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.post(
			'/',
			[POLICIES.PUBLIC],
			validate({ body: accountReqSchema }),
			AccountsController.createAccount
		);

		this.get('/', [POLICIES.PUBLIC], AccountsController.getAccounts);

		this.get(
			'/:username',
			[POLICIES.PUBLIC],
			AccountsController.getAccountByUsername
		);

		this.put(
			'/:username',
			[POLICIES.PUBLIC],
			validate({ body: accountReqSchema }),
			AccountsController.updateAccountByUsername
		);

		this.delete(
			'/:username',
			[POLICIES.PUBLIC],
			AccountsController.deleteAccountByUsername
		);
	}
}

export const accountsRouter = new AccountsRouter().router;
