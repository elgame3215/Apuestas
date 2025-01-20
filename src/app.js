import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { authRouter } from './routes/auth.routes.js';
import { CONFIG } from './config/config.js';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import express from 'express';
import Handlebars from 'handlebars';
import { initializePassport } from './auth/passport.init.js';
import mongoose from 'mongoose';
import passport from 'passport';


const app = express();
const PORT = CONFIG.PORT || 8000;

// EXPRESS
app.use(express.urlencoded({ extended: true }));
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
	res.render('login');
});

app.use('/auth', authRouter);

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