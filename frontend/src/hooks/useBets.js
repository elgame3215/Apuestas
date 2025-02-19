import { useEffect, useState } from 'react';
import { fetchBets } from '../services/fetchBets.js';
import { useNavigate } from 'react-router-dom';

export function useBets() {
	const navigate = useNavigate();
	const [bets, setBets] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadBets() {
			try {
				const { bets, status } = await fetchBets();
				if (status == 401) {
					navigate('/login');
					return;
				}
				setBets(bets);
				console.log({ bets });
			} catch (error) {
				console.error(error);
				setError(error);
			}
		}
		loadBets();
	}, []);
	async function registerBet({
		description,
		odds,
		amount,
		accounts,
		oppositeBet,
		group,
	}) {
		const body = { description, odds, amount, accounts, oppositeBet, group };
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_HOST}/api/bets`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}
		);
		return await response.json();
	}

	async function resolveBet(betID, { betResult }) {
		const body = { betResult };
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_HOST}/api/bets/resolve/${betID}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}
		);
		return await response.json();
	}

	async function cancelBet(betID) {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_HOST}/api/bets/${betID}`,
			{
				method: 'DELETE',
			}
		);
		return await response.json();
	}
	return { bets, error, registerBet, resolveBet, cancelBet };
}
