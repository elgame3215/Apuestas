import { InternalServerError } from '../../errors/generic.errors.js';
import { SheetsService } from '../../classes/SheetsService.js';

export class SheetsController {
	static async getLiquidTable(req, res, next) {
		const sheetsService = new SheetsService(req.user.accessToken);
		try {
			const liquidTable = await sheetsService.getLiquidTable();
			return res.status(200).json(liquidTable);
		} catch (error) {
			console.error(error);
			next(new InternalServerError());
		}
	}

	static async getBetsTable(req, res, next) {
		const sheetsService = new SheetsService(req.user.accessToken);
		try {
			const betsTable = await sheetsService.getBetsTable();
			return res.status(200).json(betsTable);
		} catch (error) {
			console.error(error);
			next(new InternalServerError());
		}
	}

	static async getFreeBets(req, res, next) {
		const sheetsService = new SheetsService(req.user.accessToken);
		try {
			const freeBetsTable = await sheetsService.getFreeBetsTable();
			return res.status(200).json(freeBetsTable);
		} catch (error) {
			console.error(error);
			return next(new InternalServerError());
		}
	}
	static async setNewBet(req, res, next) {
		const sheetsService = new SheetsService(req.user.accessToken);
		try {
			const response = await sheetsService.setNewBet(req.body);
			return res.status(200).json(response);
		} catch (error) {
			console.error(error);
			return next(new InternalServerError())
		}
	}
}
