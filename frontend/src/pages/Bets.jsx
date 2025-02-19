import React from 'react';
import { CardsContainer } from '../components/Cards/CardsContainer.jsx';
import { BetsProvider } from '../providers/BetsProvider.jsx';

export function Bets() {
	return (
		<div className="flex flex-col h-screen justify-evenly items-center">
			<BetsProvider>
				<CardsContainer></CardsContainer>
			</BetsProvider>
		</div>
	);
}
