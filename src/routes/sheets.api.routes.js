import { POLICIES } from '../constants/enums/policies.js';
import { Router } from './router.js';
import { SheetsController } from '../controllers/api/sheets.controller.js';
import { validate } from '../validations/validate.js';
import { betSchema } from '../validations/schemas/schema.bet.js';

class SheetsRouter extends Router {
	constructor() {
		super();
	}
	init() {
		this.get(
			'/liquid-table',
			[POLICIES.ADMIN, POLICIES.USER],
			SheetsController.getLiquidTable
		);

		this.get(
			'/bets',
			[POLICIES.USER, POLICIES.ADMIN],
			SheetsController.getBetsTable
		);

		this.get(
			'/free-bets',
			[POLICIES.USER, POLICIES.ADMIN],
			SheetsController.getFreeBets
		);

		this.post(
			'/bet',
			[POLICIES.USER, POLICIES.ADMIN],
			validate(betSchema),
			SheetsController.setNewBet
		);
	}
}

export const sheetsRouter = new SheetsRouter().router;
