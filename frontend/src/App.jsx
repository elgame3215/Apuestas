import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { Login } from './pages/Login.jsx';
import React from 'react';
import { Balance } from './pages/Balance.jsx';
import ConfigProvider from 'antd/es/config-provider';
import { COLORS } from './constants/colors.js';
import { Bets } from './pages/Bets.jsx';
import { RegisterBet } from './pages/RegisterBet.jsx';

function App() {
	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Table: {
							borderColor: COLORS.GREEN,
							headerBg: COLORS.BACKGROUND,
							colorText: COLORS.GREEN,
							colorTextHeading: COLORS.WHITE,
							fontSize: 12,
							cellPaddingInline: 8,
							cellPaddingBlock: 14,
							colorBgContainer: COLORS.GREY,
							cellFontSizeMD: 11,
						},
						Card: {
							fontSize: 14,
							headerFontSize: 18,
							colorBgContainer: COLORS.GREY,
							colorBorderSecondary: COLORS.GREEN,
							headerHeight: 10
						},
						Tabs: {
							itemSelectedColor: COLORS.GREEN,
							inkBarColor: COLORS.GREEN,
						},
					},
					token: {
						colorText: COLORS.WHITE,
						colorWarning: COLORS.GREEN,
						lineWidth: 2,
						colorPrimary: COLORS.GREEN,
					},
				}}
			>
				<div className="min-h-screen w-screen flex justify-center items-center bg-bg-menu p-4">
					<Router basename={import.meta.env.BASE_URL}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/home" element={<Home />} />
							<Route path="/balance" element={<Balance />} />
							<Route path="/bets" element={<Bets />} />
							<Route path="/new-bet" element={<RegisterBet />} />
							<Route path="/login" element={<Login />} />
							<Route path="/*" element={<NotFound />} />
						</Routes>
					</Router>
				</div>
			</ConfigProvider>
		</>
	);
}

export default App;
