import Button from 'antd/es/button';
import { COLORS } from '../../constants/colors.js';
import React from 'react';
import { Link } from 'react-router-dom';

export function AddButton({ text }) {
	return (
		<Link
			to="/new-bet"
			type="primary"
			style={{
				marginBottom: 16,
				backgroundColor: COLORS.BACKGROUND,
				color: COLORS.GREEN,
				border: `.05rem solid ${COLORS.GREEN}`,
				borderRadius: '.2rem',
				padding: '.5rem 1rem',
			}}
		>
			{text}
		</Link>
	);
}
