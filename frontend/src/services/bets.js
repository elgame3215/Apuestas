import { CONFIG } from '../config/config.js';

const { BACKEND_URL } = CONFIG;

export async function fetchBets() {
	console.log('fetching');
	const response = await fetch(`${BACKEND_URL}/api/bets`, {
		credentials: 'include',
	});
	const data = await response.json();
	return { bets: data.payload, status: response.status };
}
