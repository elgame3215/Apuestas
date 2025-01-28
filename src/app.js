import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { authRouter } from './routes/auth.routes.js';
import { CONFIG } from './config/config.js';
import cookieParser from 'cookie-parser';
import { CustomError } from './errors/CustomError.js';
import { engine } from 'express-handlebars';
import express from 'express';
import Handlebars from 'handlebars';
import { initializePassport } from './auth/passport.init.js';
import mongoose from 'mongoose';
import passport from 'passport';
import { sheetsRouter } from './routes/sheets.api.routes.js';
import { UnauthorizedError } from './errors/generic.errors.js';
import { viewsRoutes } from './routes/view.routes.js';

const app = express();
const PORT = CONFIG.PORT || 8000;

// EXPRESS
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./src/public'));

// COOKIE-PARSER
app.use(cookieParser());

// PASSPORT
initializePassport();
app.use(passport.initialize());

// HANDLEBARS
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.engine(
	'handlebars',
	engine({
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);

// ROUTES
app.get('/', (req, res) => {
	res.render('home');
});

app.use('/api', (req, res, next) => {
	req.isApiReq = true;
	return next();
});
app.use('/api/sheets', sheetsRouter);
app.use('/auth', authRouter);
app.use('/', viewsRoutes);

app.use((err, req, res, next) => {
	if (!(err instanceof CustomError)) {
		console.error(err);
		throw err;
	}
	if (err instanceof UnauthorizedError && !req.isApiReq) {
		return res.render('login');
	}
	return res.status(err.code).json({ success: false, detail: err.message });
});

app.listen(PORT, () => {
	console.log(`Server up on http://localhost:${PORT}`); // eslint-disable-line no-console
});

// MONGODB
(async () => {
	try {
		await mongoose.connect(CONFIG.MONGO.URL, {
			dbName: 'Gestor_de_apuestas',
		});
		console.log('Conexión con MongoDB establecida'); // eslint-disable-line no-console
	} catch (error) {
		console.error(`Error connecting to DB: ${error.message}`);
	}
})();
