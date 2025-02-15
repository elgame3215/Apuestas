import { useEffect } from "react";
import { fetchBets } from "../services/fetchBets.js";

export function useBets() {
	useEffect(() => {
		async function loadBets() {
			try {
				const data = await fetchBets();
			} catch (error) {
				
			}

		}
	})
}