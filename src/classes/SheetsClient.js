import { CONFIG } from '../config/config.js';
import { sheets_v4 } from 'googleapis';

export class SheetsClient {
	static instance;
	constructor(accessToken) {
		if (SheetsClient.instance) {
			return SheetsClient.instance;
		}
		this.accessToken = accessToken;
		this.sheets = new sheets_v4.Resource$Spreadsheets$Values({
			_options: {},
		});
		this.liquidTableRange = 'A2:C9';
		this.liquidTableRangeWithoutNames = 'B2:C9';
		SheetsClient.instance = this;
		return SheetsClient.instance;
	}

	async getCellRange(cellRange) {
		const response = await this.sheets.get({
			access_token: this.accessToken,
			spreadsheetId: CONFIG.SPREADSHEET.ID,
			majorDimension: 'ROWS',
			range: cellRange,
		});
		return response;
	}

	async setCellValues(cellRange, values) {
		const response = await this.sheets.update(
			{
				access_token: this.accessToken,
				spreadsheetId: CONFIG.SPREADSHEET.ID,
				range: cellRange,
				includeValuesInResponse: true,
				requestBody: { majorDimension: 'ROWS', range: cellRange, values },
				valueInputOption: 'USER_ENTERED',
				responseValueRenderOption: 'UNFORMATTED_VALUE',
			},
			{ responseType: 'json' }
		);
		return response;
	}
	async getLiquidTable() {
		const response = await this.sheets.get({
			access_token: this.accessToken,
			spreadsheetId: CONFIG.SPREADSHEET.ID,
			majorDimension: 'ROWS',
			range: this.liquidTableRange,
			valueRenderOption: 'UNFORMATTED_VALUE',
		});
		return response;
	}
	async updateTable(valueRange) {
		const response = await this.sheets.update(
			{
				access_token: this.accessToken,
				spreadsheetId: CONFIG.SPREADSHEET.ID,
				range: this.liquidTableRangeWithoutNames,
				includeValuesInResponse: true,
				requestBody: {
					majorDimension: 'ROWS',
					values: valueRange,
				},
				valueInputOption: 'USER_ENTERED',
				responseValueRenderOption: 'UNFORMATTED_VALUE',
			},
			{ responseType: 'json' }
		);
		return response;
	}
}
