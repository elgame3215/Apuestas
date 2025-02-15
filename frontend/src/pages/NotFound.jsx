import React from 'react';
import { HorizontalNavBar } from '../components/layouts/HorizontalNavBar.jsx';

export function NotFound() {
	return (
		<main className="flex flex-col items-center h-screen justify-evenly">
			<h1 className="text-green text-7xl">NOT FOUND</h1>
			<HorizontalNavBar prevPage="home"></HorizontalNavBar>
		</main>
	);
}
