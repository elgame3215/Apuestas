import { POLICIES } from '../constants/enums/policies.js';
import { Router } from './router.js';

class ViewsRoutes extends Router {
	constructor() {
		super();
	}
	init() {
		this.get('/login',  [POLICIES.PUBLIC], (req, res) => {
			res.render('login');
		});
		this.get(
			'/balance',
			 [POLICIES.USER],
			(req, res) => {
				res.render('balance');
			}
		);
		this.get('/register-win',  [POLICIES.USER], (req, res) => {
			res.render('regis-gan');
		});
		this.get(
			'/registrar-ganancia/:user',
			 [POLICIES.USER],
			(req, res) => {
				const { user } = req.params;
				res.render('regis-gan-user', { user });
			}
		);
		this.get(
			'/registrar-ganancia/:user/:platforn',
			 [POLICIES.USER],
			(req, res) => {
				const { user, platform } = req.params;
				res.render('regis-gan-user-plataforma', { user, platform });
			}
		);
		this.get('/edit-balance',  [POLICIES.USER], (req, res) => {
			res.render('edit-balance');
		});
		this.get('/bets',  [POLICIES.USER], (req, res) => {
			res.render('bets');
		});
		this.get('/register-bet',  [POLICIES.USER], (req, res) => {
			res.render('register-bet');
		});
		this.get('/register-free-bet',  [POLICIES.USER], (req, res) => {
			res.render('register-free-bet');
		});
	}
}

export const viewsRoutes = new ViewsRoutes().router;
