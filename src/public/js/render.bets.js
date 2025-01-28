async function renderTableAmounts() {
	let freeBets = JSON.parse(sessionStorage.getItem('free-bets'));
	if (!freeBets) {
		await fetchBets();
		await fetchFreeBets();
	}
	freeBets = JSON.parse(sessionStorage.getItem('free-bets'));
	const bets = JSON.parse(sessionStorage.getItem('bets'));

	const joinedFreeBets = [];
	const joinedBets = [];

	freeBets.forEach(freeBet => {
		const betInJoinedFreeBets = joinedFreeBets.find(
			b => b.apuesta == freeBet.apuesta
		);
		if (!betInJoinedFreeBets) {
			return joinedFreeBets.push({
				...freeBet,
				cuentas: [freeBet.cuenta],
			});
		}
		return betInJoinedFreeBets.cuentas.push(freeBet.cuenta);
	});

	bets.forEach(bet => {
		const betInJoinedBets = joinedBets.find(b => b.apuesta == bet.apuesta);
		if (!betInJoinedBets) {
			return joinedBets.push({ ...bet, cuentas: [bet.cuenta] });
		}
		return betInJoinedBets.cuentas.push(bet.cuenta);
	});

	const betsContainer = document.getElementById('bets-container');
	const freeBetsContainer = document.getElementById('free-bets-container');

	joinedBets.forEach(b => {
		const newItem = createListItem(b.apuesta, [
			{ key: 'cuentas', value: b.cuentas.join(', ') },
			{ key: 'monto', value: `$${b.monto}` },
			{ key: 'cuota', value: b.cuota },
			{ key: 'paga', value: `$${b.paga}` },
		]);
		betsContainer.appendChild(newItem);
	});
	joinedFreeBets.forEach(b => {
		const newItem = createListItem(b.apuesta, [
			{ key: 'cuentas', value: b.cuentas },
			{ key: 'monto', value: `$${b.monto}` },
			{ key: 'cuota', value: b.cuota },
			{ key: 'paga', value: `$${b.paga}` },
		]);
		freeBetsContainer.appendChild(newItem);
	});
}
renderTableAmounts();

function createListItem(itemName, properties) {
	// Crear el contenedor principal del list-item
	const listItem = document.createElement('div');
	listItem.className = 'list-item';
	listItem.setAttribute('onclick', 'toggleItem(this)');

	// Crear el nombre del ítem
	const betName = document.createElement('span');
	betName.className = 'bet-name';
	betName.textContent = itemName;

	// Crear la flecha
	const arrow = document.createElement('span');
	arrow.className = 'arrow';
	arrow.textContent = '▶';

	// Crear el contenedor de propiedades
	const propertiesContainer = document.createElement('div');
	propertiesContainer.className = 'properties';

	// Añadir cada propiedad como un párrafo
	properties.forEach(property => {
		const propertyParagraph = document.createElement('p');
		propertyParagraph.className = 'bet-detail';
		propertyParagraph.innerHTML = `<strong>${property.key}:</strong> ${property.value}`;
		propertiesContainer.appendChild(propertyParagraph);
	});

	// Crear el contenedor para los botones
	const buttonsContainer = document.createElement('div');
	buttonsContainer.style.marginTop = '10px';

	// Botón para marcar como cumplida
	const successButton = document.createElement('button');
	successButton.textContent = 'Cumplida';
	successButton.style.marginRight = '10px';
	successButton.style.backgroundColor = '#0b0';
	successButton.style.color = '#fff';
	successButton.style.border = 'none';
	successButton.style.padding = '5px 10px';
	successButton.style.cursor = 'pointer';
	successButton.style.borderRadius = '5px';
	successButton.onclick = e => {
		e.stopPropagation(); // Evitar que se dispare el evento de toggle
		listItem.remove(); // Eliminar el elemento del DOM
		console.log(`${itemName} marcada como cumplida.`);
	};

	// Botón para marcar como fallida
	const failButton = document.createElement('button');
	failButton.textContent = 'Fallida';
	failButton.style.backgroundColor = '#434343';
	failButton.style.color = '#fff';
	failButton.style.border = 'none';
	failButton.style.padding = '5px 10px';
	failButton.style.cursor = 'pointer';
	failButton.style.borderRadius = '5px';
	failButton.onclick = async e => {
		e.stopPropagation(); // Evitar que se dispare el evento de toggle
		await resolveBet(itemName, false, listItem);
		listItem.remove(); // Eliminar el elemento del DOM
		console.log(`${itemName} marcada como fallida.`);
	};

	// Añadir los botones al contenedor
	buttonsContainer.appendChild(successButton);
	buttonsContainer.appendChild(failButton);

	// Añadir los elementos al list-item
	listItem.appendChild(betName);
	listItem.appendChild(arrow);
	listItem.appendChild(propertiesContainer);
	listItem.appendChild(buttonsContainer);

	return listItem;
}
