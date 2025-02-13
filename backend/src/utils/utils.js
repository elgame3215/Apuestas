/**
 * @param {*} valueRange
 * @returns {Object<string, number>}
 */
export function parseLiquidTableToJson(valueRange) {
	const data = {};
	const { values } = valueRange;
	for (let i = 0; i < values.length; i += 2) {
		const user = values[i][0];
		data[user] = {
			betano: values[i + 1][1],
			bet365: values[i + 1][2],
		};
	}
	// @ts-ignore
	return data;
}

/**
 * @typedef {any[]} values
 * @description takes a `valueRange` and returns an object, on wich each key is the name of each column of the `valueRange`, and contains an array of the column values. `majorDimension` must be set on `'COLUMNS'` for this method to work properly.
 * @param {object} valueRange
 * @param {string} [valueRange.majorDimension]
 * @param {string} [valueRange.range]
 * @param {any[][]} [valueRange.values]
 * @returns {{columnName: values} | {}}
 */
export function parseValueRangeToJson(valueRange) {
	// implementar para que pueda recibir tanto `valueRange` como valueResponse `BatchGetValuesResponse`
	const data = {};
	if (!valueRange.values) {
		return data;
	}
	valueRange.values.forEach(col => {
		data[col[0]] = [];
		for (let i = 1; i < col.length; i++) {
			const cell = col[i];
			data[col[0]].push(cell);
		}
	});
	// @ts-ignore
	return data;
}

export function parseValuesResponseToJson(valuesResponse) {
	const data = {};
	const { valueRanges } = valuesResponse;
	valueRanges.forEach(valueRange => {
		Object.assign(data, parseValueRangeToJson(valueRange));
	});
	return data;
}

export function a1RangeToR1C1(a1Range) {
	const match = a1Range.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
	if (!match) {
		throw new Error('Formato de rango inválido');
	}

	const [, col1, row1, col2, row2] = match;

	function colToNumber(col) {
		let colNum = 0;
		for (let i = 0; i < col.length; i++) {
			colNum = colNum * 26 + (col.charCodeAt(i) - 64); // 'A' es 65 en ASCII
		}
		return colNum;
	}

	const colNum1 = colToNumber(col1);
	const colNum2 = colToNumber(col2);

	return `R${row1}C${colNum1}:R${row2}C${colNum2}`;
}
