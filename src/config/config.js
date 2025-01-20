import { config } from 'dotenv';

config();

export const CONFIG = {
	PORT: process.env.PORT,
	GOOGLE: {
		CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	},
	MONGO: {
		URL: process.env.MONGO_URL,
	},
	JWT: {
		SECRET: process.env.JWT_SECRET,
	},
};
