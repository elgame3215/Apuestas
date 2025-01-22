const betanoBtn = document.getElementById('betano');
const bet365Btn = document.getElementById('bet365');

betanoBtn.addEventListener('click', registerWin);
bet365Btn.addEventListener('click', registerWin);

function registerWin(e) {
	const urlArray = window.location.href.split('/');
	const user = urlArray[urlArray.length - 1];
	const platform = e.target.id.split('-');
	const actualAmountEl = document.getElementById(`${user}-${platform}`);
	const actualAmount = Number(actualAmountEl.textContent.trim().slice(1));
	const amount = Number(document.getElementById('amount').value) + actualAmount;
	const body = {
		user,
		platform,
		amount,
	};
	fetch('/api/sheets/sum-single-cell', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then(response => {
			Toastify({
				text:
					response.status == 200 ? 'Ganancia registrada' : 'Ocurrió un error',
				duration: 3000,
				gravity: 'bottom',
				backgroundColor: response.status == 200 ? '#00d800' : '#d90000',
				stopOnFocus: true,
			}).showToast();
			return response.json();
		})
		.then(data => {
			const newAmount = data.data.updatedData.values[0][0];
			actualAmountEl.textContent = `$${newAmount}`;
			sessionStorage.setItem(
				`${user.toLowerCase()}-${platform}-amount`,
				newAmount
			);
		});
}
