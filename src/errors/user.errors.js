import { CustomError } from "./CustomError.js";

export class UserNotFoundError extends CustomError {
	constructor() {
		super('Usuario no encontrado', 404);
	}
}