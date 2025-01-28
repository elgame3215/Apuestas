import { CONFIG } from '../config/config.js';
import { google } from 'googleapis';
import {
	parseLiquidTableToJson,
	parseValuesResponseToJson,
} from '../utils/utils.js';

export class SheetsService {
	static instance;
	#accessToken;
	constructor(accessToken) {
		const { instance } = SheetsService;
		if (instance) {
			instance.accessToken = accessToken;
			return instance;
		}
		this.#accessToken = accessToken;
	}

	/**
	 *
	 * @returns {Promise<Object<string, number>>}
	 */
	async getLiquidTable() {
		const response = await google.sheets('v4').spreadsheets.values.get({
			access_token: this.#accessToken,
			spreadsheetId: CONFIG.SPREADSHEET_ID,
			majorDimension: 'ROWS',
			range: 'allAmounts',
		});
		const data = parseLiquidTableToJson(response.data);
		return data;
	}

	async getBetsTable() {
		const response = await google.sheets('v4').spreadsheets.values.batchGet({
			// cambiar por batchGet, traer los `betDetails` tambien.
			access_token: this.#accessToken,
			spreadsheetId: CONFIG.SPREADSHEET_ID,
			majorDimension: 'COLUMNS',
			ranges: ['bets', 'betsDetails'],
			valueRenderOption: 'UNFORMATTED_VALUE',
		});
		const data = parseValuesResponseToJson(response.data);
		return data;
	}

	async getFreeBetsTable() {
		const response = await google.sheets('v4').spreadsheets.values.batchGet({
			// cambiar por batchGet, traer los `betDetails` tambien.
			access_token: this.#accessToken,
			spreadsheetId: CONFIG.SPREADSHEET_ID,
			majorDimension: 'COLUMNS',
			ranges: ['freeBets', 'freeBetsDetails'],
			valueRenderOption: 'UNFORMATTED_VALUE',
		});
		const data = parseValuesResponseToJson(response.data);
		return data;
	}

	async setNewBet(bet) {
		const { amount, description, odds, accounts } = bet;
		const values = [];
		this.reduceAmounts(accounts, amount, 'betano');
		accounts.forEach(account => {
			values.push([account, amount, description, odds]);
		});
		const response = await google.sheets('v4').spreadsheets.values.append({
			access_token: this.#accessToken,
			spreadsheetId: CONFIG.SPREADSHEET_ID,
			valueInputOption: 'USER_ENTERED',
			range: 'bets',
			responseValueRenderOption: 'UNFORMATTED_VALUE',
			includeValuesInResponse: true,
			requestBody: {
				majorDimension: 'ROWS',
				values,
				range: 'bets',
			},
		});
		return response;
	}

	/**
	 *
	 * @param {string[]} users
	 * @param {number} amount
	 * @param {'betano' | 'bet365'} platform
	 */
	async reduceAmounts(users, amount, platform) {
		const usersCells = CONFIG.USERS_CELLS.filter(data =>
			users.includes(data.user)
		);
		const ranges = usersCells.map(data => data.cells[platform]);
		let response = await google.sheets('v4').spreadsheets.values.batchGet({
			access_token: this.#accessToken,
			spreadsheetId: CONFIG.SPREADSHEET_ID,
			majorDimension: 'COLUMNS',
			ranges,
			valueRenderOption: 'UNFORMATTED_VALUE',
		});
		const data = [];

		usersCells.forEach((userCells, i) => {
			data.push({
				majorDimension: 'ROWS',
				range: userCells.cells[platform],
				values: [[response.data.valueRanges[i].values[0][0] - amount]],
			});
		});

		response = await google.sheets('v4').spreadsheets.values.batchUpdate({
			access_token: this.#accessToken,
			spreadsheetId: CONFIG.SPREADSHEET_ID,
			requestBody: {
				data,
				valueInputOption: 'USER_ENTERED',
				responseValueRenderOption: 'UNFORMATTED_VALUE',
				includeValuesInResponse: true,
			},
		});
		return response;
	}
}
