import { CONFIG } from '../config/config.js';
import { Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import { UserNotFoundError } from '../errors/user.errors.js';
import { AccountsService } from '../db/services/account.service.js';

export function initJwtPassport() {
	passport.use(
		'jwt',
		new JwtStrategy(
			{
				jwtFromRequest: tokenExtractor,
				secretOrKey: CONFIG.JWT.SECRET,
			},
			async (payload, done) => {
				const { email } = payload;
				const user = await AccountsService.getUserByEmail(email);
				if (!user) {
					return done(new UserNotFoundError(), false);
				}
				return done(null, user);
			}
		)
	);
}

function tokenExtractor(req) {
	return req.cookies?.token ?? null;
}
