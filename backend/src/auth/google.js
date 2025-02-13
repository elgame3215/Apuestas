import { CONFIG } from '../config/config.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { POLICIES } from '../constants/enums/policies.js';
import { UserService } from '../db/services/user.service.js';

export function initGooglePassport() {
	passport.use(
		new GoogleStrategy(
			{
				clientID: CONFIG.GOOGLE.CLIENT_ID,
				clientSecret: CONFIG.GOOGLE.CLIENT_SECRET,
				callbackURL: '/api/auth/google/callback',
			},
			async function (_, refreshToken, profile, done) {
				try {
					let user = await UserService.getUserByGoogleId(profile.id);
					const isInAdminList = CONFIG.ADMIN_EMAILS.includes(
						profile.emails[0].value
					);
					if (!user) {
						user = await UserService.createUser({
							firstName: profile.name.givenName,
							lastName: profile.name.familyName,
							email: profile.emails[0].value,
							googleID: profile.id,
							googleRefreshToken: refreshToken,
							rol: isInAdminList ? POLICIES.ADMIN : POLICIES.USER,
						});
					}
					return done(null, user);
				} catch (err) {
					console.error(err);
					return done(err);
				}
			}
		)
	);
}
