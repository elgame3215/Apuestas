import { useEffect, useState } from 'react';
import { fetchAmounts } from '../services/fetchAmounts.js';

/**
 *
 * @param {Object} param
 * @param {Function} param.formatter
 * @param {Function} param.setCount
 * @returns
 */
export function useAccounts({ formatter, setCount }) {
	const [accounts, setAccounts] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadAmounts() {
			try {
				const { data, status } = await fetchAmounts();
				if (status === 401) {
					window.location.href = '/login';
					return;
				}
				setCount(data.length);
				if (formatter) {
					setAccounts(formatter(data));
					return;
				}
				setAccounts(data);
			} catch (err) {
				console.error(err);
				setError(err);
			}
		}
		loadAmounts();
	}, []);
	async function updateAccount({ account, id }) {
		const response = await fetch(`/api/accounts/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(account),
		});
		return await response.json();
	}

	async function registerAccount({ account }) {
		const response = await fetch('/api/accounts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(account),
		});
		return await response.json();
	}

	async function deleteAccount({ id }) {
		const response = await fetch(`/api/accounts/${id}`, {
			method: 'DELETE',
		});
		return await response.json();
	}
	return {
		accounts,
		setAccounts,
		registerAccount,
		updateAccount,
		deleteAccount,
		error,
	};
}
