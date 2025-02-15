import { betReqSchema } from '../dtos/bets/req.bet.dto.js';
import { BetsController } from '../controllers/bets.controller.js';
import { POLICIES } from '../constants/enums/index.js';
import { resolveBetReqSchema } from '../dtos/bets/res.resolve.bet.dto.js';
import { Router } from './router.js';
import { validateBetAccounts } from '../middleware/validations.bet.js';
import { validateBody } from 'express-joi-validations';

class BetsRouter extends Router {
	constructor() {
		super();
	}

	init() {
		this.get('/', [POLICIES.PUBLIC], BetsController.getBets);

		this.get('/:id', [POLICIES.PUBLIC], BetsController.getBetById);

		this.post(
			'/',
			[POLICIES.PUBLIC],
			validateBody(betReqSchema),
			validateBetAccounts,
			BetsController.registerBet
		);

		this.put(
			'/:id',
			[POLICIES.PUBLIC],
			validateBody(resolveBetReqSchema),
			BetsController.resolveBet
		);
	}
}

export const betsRouter = new BetsRouter().router;
