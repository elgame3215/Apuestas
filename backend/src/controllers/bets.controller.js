import { betListResSchema } from '../dtos/bets/res.bet.list.dto.js';
import { BetNotFoundError } from '../errors/bet.errors.js';
import { betResSchema } from '../dtos/bets/res.bet.dto.js';
import { BetsService } from '../services/bets.service.js';
import { InternalServerError } from '../errors/generic.errors.js';
import { sendSuccess } from '../utils/custom.responses.js';

export class BetsController {
	static async getBetById(req, res, next) {
		const { id } = req.params;

		const bet = await BetsService.getBetById(id);

		if (!bet) {
			return next(new BetNotFoundError());
		}

		sendSuccess({
			res,
			next,
			code: 200,
			payload: bet,
			dtoSchema: betResSchema,
		});
	}
	static async resolveBet(req, res, next) {
		const { id } = req.params;
		const { betResult } = req.body;
		const response = await BetsService.resolveBetById(id, { betResult });
		sendSuccess({
			res,
			next,
			code: 200,
			payload: response,
			dtoSchema: betResSchema,
		});
	}

	static async registerBet(req, res, next) {
		try {
			const betDetails = req.body;
			const payload = await BetsService.registerBet(betDetails);

			sendSuccess({
				res,
				next,
				code: 201,
				detail: 'Apuesta registrada',
				payload,
				dtoSchema: betResSchema,
			});
		} catch (error) {
			console.error(error);
			return next(new InternalServerError());
		}
	}

	static async getBets(req, res, next) {
		try {
			const payload = await BetsService.getBets();
			sendSuccess({
				res,
				next,
				code: 200,
				payload,
				dtoSchema: betListResSchema,
			});
		} catch (error) {
			console.error(error);
			return next(new InternalServerError());
		}
	}
}
