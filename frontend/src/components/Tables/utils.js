export function formatAccountsData(data) {
	return data.map(acc => {
		return {
			key: acc.username,
			cuenta: acc.username,
			betano: acc.amounts.betano,
			bet365: acc.amounts.bet365,
			accountId: acc.id,
		};
	});
}

export function renderCurrency(val) {
	return parseToCurrency(val);
}

export function parseToCurrency(total) {
	return Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'USD',
	}).format(total);
}
