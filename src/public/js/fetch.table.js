async function fetchTable() {
	fetch('/api/sheets/liquid-table')
		.then(response => response.json())
		.then(data => {
			for (const userName in data) {
				const user = data[userName];
				sessionStorage.setItem(`${userName.toLowerCase()}-betano-amount`, user.betano);
				sessionStorage.setItem(`${userName.toLowerCase()}-bet365-amount`, user.bet365);
			}
		});
}

if (!sessionStorage.getItem('nahu-bet365-amount')) {
	fetchTable();
}
