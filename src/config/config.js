import { Command } from 'commander';
import { config } from 'dotenv';

const program = new Command();
program.option('-e, --env <string>', 'enviorment', 'dev');
const env = program.opts().env;
let envPath;
switch (env) {
	case 'dev':
	case 'development':
		envPath = '.env.dev';
		break;
	case 'prod':
	case 'production':
		envPath = '.env.prod';
		break;
	default:
		envPath = '.env.dev';
		break;
}

config({ path: envPath });

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
	SPREADSHEET_ID: process.env.SPREADSHEET_ID,
	USERS: ['franco', 'leandro', 'leonel', 'nahuel'],
	USERS_CELLS: [
		{
			user: 'franco',
			cells: { betano: 'B3', bet365: 'C3' },
			namedRange: 'francoAmounts',
		},
		{
			user: 'leandro',
			cells: { betano: 'B5', bet365: 'C5' },
			namedRange: 'leandroAmounts',
		},
		{
			user: 'leonel',
			cells: { betano: 'B7', bet365: 'C7' },
			namedRange: 'leonelAmounts',
		},
		{
			user: 'nahuel',
			cells: { betano: 'B9', bet365: 'C9' },
			namedRange: 'nahuelAmounts',
		},
	],
};
