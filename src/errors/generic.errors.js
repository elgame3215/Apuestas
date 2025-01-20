import { CustomError } from "./CustomError.js";

export class UnauthorizedError extends CustomError {
	constructor () {
		super('Acceso no autorizado', 401);
	}
}