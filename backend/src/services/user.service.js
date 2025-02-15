import { userModel } from '../models/user.model.js';

export class UserService {
	static async getUserById(id) {
		return await userModel.findById(id);
	}

	static async getUserByGoogleId(id) {
		return await userModel.findOne({ googleID: id });
	}

	static async createUser(user) {
		return await userModel.create(user);
	}

	static async getUserByEmail(email) {
		return await userModel.findOne({ email: email });
	}
}
