import { CustomError } from "./CustomError.js";

export class UnauthorizedError extends CustomError {
	constructor () {
		super('Acceso no autorizado', 401);
	}
}
export class BadRequestError extends CustomError {
	constructor(message) {
		super(message, 400);
	}
}
export class InternalServerError extends CustomError {
	constructor() {
		super('Error del servidor', 500);
	}
}