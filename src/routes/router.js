import { Router as ExpressRouter } from 'express';
import passport from 'passport';
import { POLICIES } from '../constants/enums/policies.js';
import {
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
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	get(path, policies, ...callbacks) {
		this.router.get(
			path,
			this.handlePolicies(policies),
			...callbacks
		);
	}
	/**
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	post(path, policies, ...callbacks) {
		this.router.post(
			path,
			this.handlePolicies(policies),
			...callbacks
		);
	}
	/**
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	put(path, policies, ...callbacks) {
		this.router.put(
			path,
			this.handlePolicies(policies),
			...callbacks
		);
	}
	/**
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @param {String[]} options.policies
	 * @param  {...import('express').RequestHandler} callbacks
	 */
	delete(path, policies, ...callbacks) {
		this.router.delete(
			path,
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
