import Table from 'antd/es/table';
import Typography from 'antd/es/typography';
import React from 'react';
import { parseToCurrency } from './utils.js';
import { COLORS } from '../../constants/colors.js';

const { Text } = Typography;

export function Summary(data) {
	let total = 0;
	data.forEach(({ betano, bet365 }) => {
		total += Number(betano) + Number(bet365);
	});
	return (
		<>
			<Table.Summary.Row>
				<Table.Summary.Cell className="text-white" index={0}>
					Total
				</Table.Summary.Cell>
				<Table.Summary.Cell index={1}>
					<Text style={{ color: COLORS.WHITE }} type="danger">
						{parseToCurrency(total)}
					</Text>
				</Table.Summary.Cell>
			</Table.Summary.Row>
		</>
	);
}
