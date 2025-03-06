import { accountModel } from '../models/account.model.js'

export class AccountsService {
  /**
	 *
	 * @param {Object} param
	 * @param {any} param.id
	 * @param {number} param.amount
	 * @param {'betano' | 'bet365'} param.platform
	 * @returns
	 */
  static async increaseAmountById ({ id, amount, platform }, { session }) {
    return await accountModel.findByIdAndUpdate(
      id,
      {
        $inc: { [`amounts.${platform}`]: amount }
      },
      { session }
    )
  }

  static async deleteAccountById (id) {
    return await accountModel
      .findByIdAndDelete(id, { new: true })
      .lean({ virtuals: true })
  }

  static async getAccountById (id) {
    return await accountModel.findById(id).lean({ virtuals: true })
  }

  static async createAccount ({ username }) {
    const newAccount = await accountModel.create({ username })
    return newAccount.toObject()
  }

  static async getAccounts () {
    const accounts = await accountModel.find().lean({ virtuals: true })
    return accounts
  }

  static async updateAccountById (id, account) {
    return await accountModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            username: account.username,
            amounts: {
              betano: account.amounts.betano,
              bet365: account.amounts.bet365
            }
          }
        },
        { new: true }
      )
      .lean({ virtuals: true })
  }
}
