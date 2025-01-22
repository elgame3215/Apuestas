import { POLICIES } from '../enums/policies.js';
import { Router } from './router.js';

class ViewsRoutes extends Router {
	constructor() {
		super();
	}
	init() {
		this.get('/login', { policies: [POLICIES.PUBLIC] }, (req, res) => {
			res.render('login');
		});
		this.get(
			'/balance-y-apuestas',
			{ policies: [POLICIES.USER] },
			(req, res) => {
				res.render('balance-y-apuestas');
			}
		);
		this.get('/register-win', { policies: [POLICIES.USER] }, (req, res) => {
			res.render('regis-gan');
		});
		this.get(
			'/registrar-ganancia/:user',
			{ policies: [POLICIES.USER] },
			(req, res) => {
				const { user } = req.params;
				res.render('regis-gan-user', { user });
			}
		);
		this.get(
			'/registrar-ganancia/:user/:platforn',
			{ policies: [POLICIES.USER] },
			(req, res) => {
				const { user, platform } = req.params;
				res.render('regis-gan-user-plataforma', { user, platform });
			}
		);
		this.get('/edit-balance', { policies: [POLICIES.USER] }, (req, res) => {
			res.render('edit-balance');
		});
	}
}

export const viewsRoutes = new ViewsRoutes().router;
