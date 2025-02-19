import React from 'react';
import { Link } from 'react-router-dom';

export function NavButton({ text, href, leftBorder = false }) {
	let className = 'text-green size justify-center flex p-5';
	if (leftBorder) {
		className += ' border-l-2';
	}
	return (
		<span className={className}>
			<Link className="text-3xl text-center" to={href}>
				{text}
			</Link>
		</span>
	);
}
