export async function fetchBets() {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/bets`, {
		credentials: 'include',
	});
	const data = await response.json();
	return { bets: data.payload, status: response.status };
}
