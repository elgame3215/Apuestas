function fetchBets() {
	return fetch('/api/sheets/bets')
		.then(response => response.json())
		.then(data => {
			const bets = [];
			for (let i = 0; i < data.Monto.length; i++) {
				const bet = {
					monto: data.Monto[i],
					apuesta: data.Apuesta[i],
					cuota: data.Cuota[i],
					paga: data.Paga[i],
					cuenta: data.Cuenta[i],
				};
				bets.push(bet);
			}
			sessionStorage.setItem('bets', JSON.stringify(bets));
		});
}

function fetchFreeBets() {
	return fetch('/api/sheets/free-bets')
		.then(response => response.json())
		.then(data => {
			const freeBets = [];
			for (let i = 0; i < data.Monto.length; i++) {
				const freeBet = {
					monto: data.Monto[i],
					apuesta: data.Apuesta[i],
					cuota: data.Cuota[i],
					paga: data.Paga[i],
					cuenta: data.Cuenta[i],
				};
				freeBets.push(freeBet);
			}
			sessionStorage.setItem('free-bets', JSON.stringify(freeBets));
		});
}
