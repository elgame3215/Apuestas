import { getRange, getUserAndPlatformCell } from "../utils/utils.js";

export function parseRange(req, res, next) {
	const { user, platform } = req.body;
	const userCell = getUserAndPlatformCell(user, platform);
	const cellRange = getRange(userCell);
	req.body.cellRange = cellRange;
	next();
}