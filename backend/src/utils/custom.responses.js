import { DtoError } from '../errors/validation.errors.js';

/**
 *
 * @param {Object} data
 * @param {Response} data.res
 * @param {Function} data.next
 * @param {Number} data.code
 * @param {String} [data.detail]
 * @param {object} [data.payload]
 * @param {import("joi").AnySchema} [data.dtoSchema]
 * @returns
 */
export function sendSuccess({ res, next, code, detail, payload, dtoSchema }) {
	const response = { success: true };
	if (detail) {
		response.detail = detail;
	}
	if (payload) {
		const { error, value } = dtoSchema.validate(payload, {
			convert: true,
			stripUnknown: true,
		});
		if (error) {
			return next(new DtoError(error));
		}
		response.payload = value;
	}
	return res.status(code).json(response);
}

/**
 *
 * @param {Object} data
 * @param {Response} data.res
 * @param {Number} data.code
 * @param {String} data.message
 * @returns
 */
export function sendError({ res, code, message }) {
	return res.status(code).json({ status: 'error', message, code });
}
