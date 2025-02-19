import React from 'react';
import { NavButton } from '../UI/NavButton.jsx';

export function HorizontalNavBar({ prevPage }) {
	const prevPageHref = `/${prevPage}`;
	const goBackButton = <NavButton text="Atrás" href={prevPageHref}></NavButton>;
	return (
		<nav
			className="flex justify-center items-center gap-y-5 shadow-[1px_2px_4px_#141414,_0_4px_12px_#0a0a0a] shadow-black mb-5"
			id="nav"
		>
			<NavButton text="Inicio" href="/"></NavButton>
			{prevPage !== 'home' ? goBackButton : null}
		</nav>
	);
}
