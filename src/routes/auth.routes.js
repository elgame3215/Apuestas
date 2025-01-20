import { OAuth2Client } from 'google-auth-library';
import passport from 'passport';
import { POLICIES } from '../enums/policies.js';
import { Router } from './router.js';
import { setToken } from '../utils/jwt.utils.js';

new OAuth2Client({});

class AuthRouter extends Router {
	constructor() {
		super();
		this.init();
	}
	init() {
		this.post(
			'/google',
			[POLICIES.PUBLIC],
			passport.authenticate('google', {
				scope: ['email'],
				session: false,
				accessType: 'offline',
				prompt: 'consent',
			})
		);

		this.get(
			'/google/callback',
			[POLICIES.PUBLIC],
			passport.authenticate('google', {
				failureRedirect: '/login',
				session: false,
			}),
			function (req, res) {
				setToken(req, res);
				res.redirect('/');
			}
		);
	}
}

export const authRouter = new AuthRouter().router;
