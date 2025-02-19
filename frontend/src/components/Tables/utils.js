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
	return formatToCurrency(val);
}

export function formatToCurrency(total) {
	return Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'USD',
	}).format(total);
}
