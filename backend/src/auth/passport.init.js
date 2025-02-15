import { UserService } from '../services/user.service.js';
import { initGooglePassport } from './google.js';
import { initJwtPassport } from './jwt.js';
import passport from 'passport';

export function initializePassport() {
	initJwtPassport();
	initGooglePassport();
	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		return done(null, await UserService.getUserById(id));
	});
}
