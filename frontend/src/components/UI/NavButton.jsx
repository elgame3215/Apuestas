import React from 'react';

export function NavButton({ text, href, leftBorder = false }) {
	let className = 'text-green size justify-center flex p-5';
	if (leftBorder) {
		className += ' border-l-2';
	}
	return (
		<span className={className}>
			<a className="text-3xl text-center" href={href}>
				{text}
			</a>
		</span>
	);
}
