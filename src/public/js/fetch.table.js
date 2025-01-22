async function fetchTable() {
	fetch('/api/sheets/table')
		.then(response => response.json())
		.then(data => {
			const cellArray = data.data.values;
			let user;
			for (let i = 0; i < cellArray.length; i++) {
				const row = cellArray[i];
				if (i % 2 == 0) {
					user = row[0];
					continue;
				}
				sessionStorage.setItem(`${user.toLowerCase()}-betano-amount`, row[1]);
				sessionStorage.setItem(`${user.toLowerCase()}-bet365-amount`, row[2]);
			}
		});
}

if (!sessionStorage.getItem('nahu-bet365-amount')) {
	fetchTable();
}