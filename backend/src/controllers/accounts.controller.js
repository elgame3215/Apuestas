import { accountListResSchema } from '../dtos/account/res.account.list.dto.js'
import { AccountNotFoundError } from '../errors/account.errors.js'
import { accountResSchema } from '../dtos/account/res.account.dto.js'
import { AccountsService } from '../services/account.service.js'
import { InternalServerError } from '../errors/generic.errors.js'
import { sendSuccess } from '../utils/custom.responses.js'

export class AccountsController {
  static async deleteAccountById (req, res, next) {
    const { id } = req.params
    try {
      const deletedAccount = await AccountsService.deleteAccountById(id)

      if (!deletedAccount) {
        return next(new AccountNotFoundError())
      }

      return sendSuccess({
        res,
        next,
        code: 200,
        detail: 'Account deleted',
        payload: deletedAccount,
        dtoSchema: accountResSchema
      })
    } catch (error) {
      console.error(error)
      return next(new InternalServerError())
    }
  }

  static async getAccountById (req, res, next) {
    const { id } = req.params

    try {
      const account = await AccountsService.getAccountById(id)

      if (!account) {
        return next(new AccountNotFoundError())
      }

      return sendSuccess({
        res,
        next,
        code: 200,
        payload: account,
        dtoSchema: accountResSchema
      })
    } catch (error) {
      console.error(error)
      return next(new InternalServerError())
    }
  }

  static async createAccount (req, res, next) {
    const { username } = req.body
    try {
      const newAccount = await AccountsService.createAccount({ username })
      return sendSuccess({
        res,
        next,
        code: 201,
        detail: 'Account created',
        payload: newAccount,
        dtoSchema: accountResSchema
      })
    } catch (error) {
      console.error(error)
      return next(new InternalServerError())
    }
  }

  static async getAccounts (req, res, next) {
    try {
      const accounts = await AccountsService.getAccounts()
      return sendSuccess({
        res,
        next,
        code: 200,
        payload: accounts,
        dtoSchema: accountListResSchema
      })
    } catch (error) {
      console.error(error)
      return next(new InternalServerError())
    }
  }

  static async updateAccountById (req, res, next) {
    try {
      const { id } = req.params
      const account = req.body
      const updatedAccount = await AccountsService.updateAccountById(
        id,
        account
      )

      if (!updatedAccount) {
        return next(new AccountNotFoundError())
      }

      return sendSuccess({
        res,
        next,
        code: 200,
        payload: updatedAccount,
        dtoSchema: accountResSchema
      })
    } catch (error) {
      console.error(error)
      return next(new InternalServerError())
    }
  }
}
