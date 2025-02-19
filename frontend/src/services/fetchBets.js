export async function fetchBets() {
	const response = await fetch(`/api/bets`, {
		credentials: 'include',
	});
	const data = await response.json();
	return { bets: data.payload, status: response.status };
}
