import { CONFIG } from "../config/config.js";

export function getRange(userCell1, userCell2 = userCell1) {
	return `${userCell1}:${userCell2}`;
}

export function getUserAndPlatformCell(user, platform) {
	return CONFIG.USERS[user].cells[platform];
}