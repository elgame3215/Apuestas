import { initGooglePassport } from './google.js';
import { initJwtPassport } from './jwt.js';
import passport from 'passport';
import { UserService } from '../db/services/user.service.js';

export function initializePassport() {
	initJwtPassport();
	initGooglePassport();
	passport.serializeUser((user, done) => {
		return done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		return done(null, await UserService.getUserById(id));
	});
}
