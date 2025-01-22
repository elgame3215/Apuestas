import { Router as ExpressRouter } from 'express';
import passport from 'passport';
import { POLICIES } from '../enums/policies.js';
import {
	BadRequestError,
	UnauthorizedError,
} from '../errors/generic.errors.js';

export class Router {
	constructor() {
		this.router = ExpressRouter();
		this.init();
	}
	init() {}
	/**
	 * @param {String[]} policies
	 */
	handlePolicies(policies) {
		return async (req, res, next) => {
			if (policies.includes(POLICIES.PUBLIC)) {
				console.log('paso handlePolicies');
				return next();
			}
			passport.authenticate('jwt', { session: false }, (err, user) => {
				if (err) {
					next(err);
				}
				if (!policies.includes(user.rol)) {
					return next(new UnauthorizedError());
				}
				req.user = user;
				return next(); // [next] es la misma funcion en ambos scopes, si no se invoca dentro del callback de passport no funciona. Es feo, pero es lo que hay
			})(req, res, next);
			return;
		};
	}

	/**
	 * @param {String[]} requiredCamps
	 */
	validateRequiredCamps(requiredCamps) {
		return (req, res, next) => {
			if (requiredCamps.length == 0) {
				return next();
			}
			for (const camp of requiredCamps) {
				if (!(req.body[camp] ?? false)) {
					return next(
						new BadRequestError(
							`${camp} es requerido pero no se encontró en el cuerpo de la petición`
						)
					);
				}
			}
			return next();
		};
	}

	/**
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param {String[]} [options.requiredCamps]
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	get(path, { policies, requiredCamps = [] }, ...callbacks) {
		this.router.get(
			path,
			this.validateRequiredCamps(requiredCamps),
			this.handlePolicies(policies),
			...callbacks
		);
	}
	/**
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param {String[]} [options.requiredCamps]
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	post(path, { policies, requiredCamps = [] }, ...callbacks) {
		this.router.post(
			path,
			this.validateRequiredCamps(requiredCamps),
			this.handlePolicies(policies),
			...callbacks
		);
	}
	/**
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param {String[]} [options.requiredCamps]
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	put(path, { policies, requiredCamps = [] }, ...callbacks) {
		this.router.put(
			path,
			this.validateRequiredCamps(requiredCamps),
			this.handlePolicies(policies),
			...callbacks
		);
	}
	/**
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param {String[]} [options.requiredCamps]
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	delete(path, { policies, requiredCamps = [] }, ...callbacks) {
		this.router.delete(
			path,
			this.validateRequiredCamps(requiredCamps),
			this.handlePolicies(policies),
			...callbacks
		);
	}

	/**
	 *
	 * @param  {import('express').RequestParamHandler} callback
	 */
	param(param, callback) {
		this.router.param(param, callback);
	}
}
