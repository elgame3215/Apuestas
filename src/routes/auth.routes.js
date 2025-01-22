import passport from 'passport';
import { POLICIES } from '../enums/policies.js';
import { Router } from './router.js';
import { setToken } from '../utils/jwt.utils.js';

class AuthRouter extends Router {
	constructor() {
		super();
		this.init();
	}
	init() {
		this.get(
			'/google',
			{ policies: [POLICIES.PUBLIC] },
			passport.authenticate('google', {
				scope: ['email', 'https://www.googleapis.com/auth/spreadsheets'],
				session: false,
				accessType: 'offline',
				prompt: 'consent',
			})
		);

		this.get(
			'/google/callback',
			{ policies: [POLICIES.PUBLIC] },
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
