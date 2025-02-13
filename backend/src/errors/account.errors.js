import { CustomError } from './CustomError.js';

export class AccountNotFoundError extends CustomError {
	constructor() {
		super('Account not found', 404);
	}
}
