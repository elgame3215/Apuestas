import { InternalServerError } from '../errors/generic.errors.js';
import { parseRange } from '../middleware/api.sheet.body.parser.js';
import passport from 'passport';
import { POLICIES } from '../enums/policies.js';
import { Router } from './router.js';
import { SheetsClient } from '../classes/SheetsClient.js';

class SheetsRouter extends Router {
	constructor() {
		super();
	}
	init() {
		this.put(
			'/sum-single-cell',
			{
				policies: [POLICIES.USER],
				requiredCamps: ['amount', 'user', 'platform'],
			},
			passport.authenticate('jwt', { session: false }),
			parseRange,
			async (req, res, next) => {
				const { cellRange, amount } = req.body;
				const sheetsClient = await new SheetsClient(req.user.accessToken);
				try {
					const response = await sheetsClient.setCellValues(cellRange, [
						[amount],
					]);
					res.status(200).json(response);
				} catch (err) {
					console.error(err);
					next(new InternalServerError());
				}
			}
		);
		this.get(
			'/table',
			{ policies: [POLICIES.USER] },
			passport.authenticate('jwt', { session: false }),
			async (req, res, next) => {
				const sheetsClient = new SheetsClient(req.user.accessToken);
				try {
					const response = await sheetsClient.getLiquidTable();
					res.status(200).json(response);
				} catch (err) {
					console.error(err);
					next(new InternalServerError());
				}
			}
		);
		this.put(
			'/table',
			{
				policies: [POLICIES.USER],
				requiredCamps: ['franco', 'leandro', 'leonel', 'nahuel'],
			},
			passport.authenticate('jwt', { session: false }),
			async (req, res, next) => {
				const valueRange = [];
				for (const userName in req.body) {
					const user = req.body[userName];
					const userAmounts = [user.betano, user.bet365];
					valueRange.push(['Betano', 'Bet365']);
					valueRange.push(userAmounts);
				}
				const sheetsClient = new SheetsClient(req.user.accessToken);
				try {
					const response = await sheetsClient.updateTable(valueRange);
					res.status(200).json(response);
				} catch (err) {
					console.error(err);
					next(new InternalServerError());
				}
			}
		);
	}
}

export const sheetsRouter = new SheetsRouter().router;
