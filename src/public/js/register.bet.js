function registerBet() {
	const sessionStorageBets = JSON.parse(sessionStorage.getItem('bets')) || [];
	const form = document.getElementById('bet-form');
	const formData = new FormData(form);
	const body = Object.fromEntries(formData.entries());
	const accounts = [];
	for (const key in body) {
		const value = body[key];
		if (value == 'on') {
			accounts.push(key);
			delete body[key];
		}
	}
	body.accounts = accounts;
	if (
		sessionStorageBets
			.map(bet => bet.apuesta.toLowerCase())
			.includes(body.description.toLowerCase())
	) {
		return Toastify({
			text: 'Apuesta ya realizada',
			duration: 3000,
			gravity: 'bottom',
			backgroundColor: '#d90000',
			stopOnFocus: true,
		}).showToast();
	}
	fetch('/api/sheets/bet', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
		.then(response => response.json())
		.then(data => {
			const rangeUpdated = data.data.updates.updatedData.range.split('!')[1];
			const { values } = data.data.updates.updatedData;
			values.forEach(row => {
				const bet = {
					cuenta: row[0],
					monto: row[1],
					apuesta: row[2],
					cuota: row[3],
					paga: row[1] * row[3],
					range: rangeUpdated,
				};
				sessionStorageBets.push(bet);
			});
			sessionStorage.setItem('bets', JSON.stringify(sessionStorageBets));
		});
}

function registerFreeBet() {}
