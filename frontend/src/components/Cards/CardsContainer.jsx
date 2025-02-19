import React from 'react';
import { BetCard } from './BetCard.jsx';
import { useBetsContext } from '../../hooks/useBetsContext.js';
import { HorizontalNavBar } from '../layouts/HorizontalNavBar.jsx';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants/colors.js';

export function CardsContainer() {
	const { bets } = useBetsContext();

	const activeBets = bets.filter(bet => bet.status === 'active');

	const activeBetCardsNode = activeBets.map(bet => {
		const { group, description, accounts, amount, odds, oppositeBet, id } = bet;
		return (
			<BetCard
				group={group}
				description={description}
				accounts={accounts}
				amount={amount}
				odds={odds}
				oppositeBet={oppositeBet}
				betID={id}
				key={id}
			></BetCard>
		);
	});
	return (
		<main className="flex flex-col items-center gap-9">
			<Link
				to="/new-bet"
				style={{
					marginBottom: 16,
					backgroundColor: COLORS.BACKGROUND,
					color: COLORS.GREEN,
					borderRadius: 5,
					padding: 6,
					border: `.05rem solid ${COLORS.GREEN}`,
				}}
			>
				Agregar apuesta
			</Link>
			{activeBets.length ? (
				activeBetCardsNode
			) : (
				<h1 className="text-green">No hay apuestas</h1>
			)}
			<HorizontalNavBar prevPage="home"></HorizontalNavBar>
		</main>
	);
}
