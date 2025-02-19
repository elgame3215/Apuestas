import { createContext, useContext } from 'react';

export const BetsContext = createContext(null);

export function useBetsContext() {
	const context = useContext(BetsContext);
	if (!context) {
		throw new Error('useBetsContext must be used within a BetsProvider');
	}
	return context;
}
