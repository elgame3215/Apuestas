import { Command } from 'commander';
import { config } from 'dotenv';

const program = new Command();
program.option('-e, --env <string>', 'environment', 'dev');
const { env } = program.opts();
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
		DB_NAME: process.env.MONGO_DB_NAME,
	},
	JWT: {
		SECRET: process.env.JWT_SECRET,
	},
	ADMIN_EMAILS: ['francofumiere321@gmail.com'],
	FRONTEND_URL: process.env.FRONTEND_URL,
};
