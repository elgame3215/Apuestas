import { CONFIG } from '../config/config.js';
import { Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import { UserNotFoundError } from '../errors/user.errors.js';
import { UserService } from '../db/services/user.service.js';

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
				const user = await UserService.getUserByEmail(email);
				if (!user) {
					return done(new UserNotFoundError(), false);
				}
				user.accessToken = payload.accessToken;
				return done(null, user);
			}
		)
	);
}

function tokenExtractor(req) {
	return req.cookies?.token ?? null;
}
