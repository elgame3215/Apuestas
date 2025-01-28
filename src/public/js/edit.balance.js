function editCell(button) {
	const cell = button.parentElement;
	const span = cell.querySelector('span');
	const currentValue = span.textContent;

	const input = document.createElement('input');
	input.classList.add('input');
	input.type = 'number';
	input.value = currentValue;

	const saveButton = document.createElement('button');
	saveButton.classList.add('input-btn');
	saveButton.textContent = 'Guardar';
	saveButton.onclick = () => {
		span.textContent = `$${input.value}`;
		cell.replaceChild(span, input);
		cell.replaceChild(button, saveButton);
	};

	cell.replaceChild(input, span);
	cell.replaceChild(saveButton, button);
}

function confirmChanges() {
	const body = {};
	const cellArray = Array.from(document.querySelectorAll('td'));
	for (const cell of cellArray) {
		const spanEl = cell.childNodes[1];
		const [user, platform] = cell.id.split('-');
		if (!body[user]) {
			body[user] = {};
		}
		body[user][platform] = Number(spanEl.textContent.trim().slice(1));
	}
	const bodyJSON = JSON.stringify(body, null, 4);
	fetch('/api/sheets/liquid-table', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: bodyJSON,
	}).then(response => {
		Toastify({
			text: response.status == 200 ? 'Tabla actualizada' : 'Ocurrió un error',
			duration: 3000,
			gravity: 'bottom',
			backgroundColor: response.status == 200 ? '#00d800' : '#d90000',
			stopOnFocus: true,
		}).showToast();
		return response.json();
	});
}
