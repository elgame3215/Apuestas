import { CustomError } from './CustomError.js';

export class BetNotFoundError extends CustomError {
	constructor() {
		super('Apuesta no encontrada', 400);
	}
}
