import { CONFIG } from '../config/config.js';
import passport from 'passport';
import { POLICIES } from '../constants/enums/index.js';
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
			[POLICIES.PUBLIC],
			passport.authenticate('google', {
				scope: ['email', 'profile'],
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
				const url = CONFIG.FRONTEND_URL;
				res.redirect(`${url}`);
			}
		);
	}
}

export const authRouter = new AuthRouter().router;
