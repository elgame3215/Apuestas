function renderTableAmounts() {
	const amountElArray = Array.from(document.querySelectorAll('.amount-el'));
	amountElArray.forEach(el => {
		const key = `${el.id.split('-').slice(0, 2).join('-')}-amount`;
		const amount = sessionStorage.getItem(
			key
		);
		el.textContent = `$${amount}`;
	});
}
renderTableAmounts();