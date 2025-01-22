import { CONFIG } from '../config/config.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { UserService } from '../db/services/user.service.js';


export function initGooglePassport() {
	passport.use(
		new GoogleStrategy(
			{
				clientID: CONFIG.GOOGLE.CLIENT_ID,
				clientSecret: CONFIG.GOOGLE.CLIENT_SECRET,
				callbackURL: '/auth/google/callback',
			},
			async function (accessToken, refreshToken, profile, done) {
				try {
					let user = await UserService.getUserByGoogleId(profile.id);
					if (!user) {
						user = await UserService.createUser({
							email: profile.emails[0].value,
							googleID: profile.id,
							googleAccessToken: accessToken,
							googleRefreshToken: refreshToken,
						});
					}
					user.accessToken = accessToken;
					return done(null, user);
				} catch (err) {
					console.error(err);
					return done(err);
				}
			}
		)
	);
}
