function resolveBet(apuesta, betSuccess, listItem) {
	const sessionStorageBets = JSON.parse(sessionStorage.getItem('bets'));
	const sessionStorageBet = sessionStorageBets.find(
		bet => bet.apuesta == apuesta
	);
	const sessionStorageBetRange = sessionStorageBet.range;
	console.log(sessionStorageBetRange);
	return fetch(`/api/sheets/bet/${apuesta}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ betSuccess, range: sessionStorageBetRange }),
	}).then(response => {
		if (response.status == 200) {
			listItem.remove();
			sessionStorage.setItem(
				'bets',
				JSON.stringify(sessionStorageBets.filter(bet => bet.apuesta != apuesta))
			);
		}
	});
}

function resolveFreeBet(e, betSuccess, listItem) {}
