import { CONFIG } from '../config/config.js';
import jwt from 'jsonwebtoken';


export function createToken(payload) {
	const token = jwt.sign(payload, CONFIG.JWT.SECRET);
	return token;
}

export function verifyToken(token) {
	return jwt.verify(token, CONFIG.JWT.SECRET);
}

export function setToken(req, res) {
	const payload = {
		email: req.user.email,
		rol: req.user.rol,
		accesToken: req.user.googleAccessToken
	};
	const token = jwt.sign(payload, CONFIG.JWT.SECRET, {
		expiresIn: '1h',
	});
	res.cookie('token', token, {
		httpOnly: true,
	});
}