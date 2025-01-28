import { BadRequestError } from "../errors/generic.errors.js";

export function validate(schema) {
	return (req, res, next) => {
		console.log(req.body);
		const { error } = schema.validate(req.body);
		if (error) {
			return next(new BadRequestError(error));
		}
		return next();
	};
}
