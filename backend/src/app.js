import { accountsRouter } from './routes/accounts.routes.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { authRouter } from './routes/auth.routes.js';
import { CONFIG } from './config/config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CustomError } from './errors/CustomError.js';
import { engine } from 'express-handlebars';
import express from 'express';
import Handlebars from 'handlebars';
import { initializePassport } from './auth/passport.init.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import { UnauthorizedError } from './errors/generic.errors.js';

const app = express();
const PORT = CONFIG.PORT || 8000;

// CORS
app.use(cors({ origin: CONFIG.FRONTEND_URL, credentials: true }));

// EXPRESS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./src/public'));

// COOKIE-PARSER
app.use(cookieParser());

// PASSPORT
app.use(passport.initialize());
initializePassport();

// HANDLEBARS
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.engine(
	'handlebars',
	engine({
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);

// MORGAN
app.use(morgan('dev'));

// ROUTES
// app.use('/api/bets', betsRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/auth', authRouter);

// MANEJO DE ERRORES
app.use((err, req, res, next) => {
	if (!(err instanceof CustomError)) {
		throw err;
	}
	return res.status(err.code).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
	console.log(`Server up on http://localhost:${PORT}`); // eslint-disable-line no-console
});

// MONGODB
(async () => {
	try {
		await mongoose.connect(CONFIG.MONGO.URL, {
			dbName: CONFIG.MONGO.DB_NAME,
		});
		console.log('Conexión con MongoDB establecida'); // eslint-disable-line no-console
	} catch (error) {
		console.error(`Error connecting to DB: ${error.message}`);
	}
})();
