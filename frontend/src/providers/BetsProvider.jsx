import { useBets } from "../hooks/useBets.js";
import { BetsContext } from "../hooks/useBetsContext.js";


export function BetsProvider({ children }) {
	const betsData = useBets();
	return (
		<BetsContext.Provider value={betsData}>{children}</BetsContext.Provider>
	);
}

