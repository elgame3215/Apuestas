import { accountReqSchema } from '../dtos/account/req.account.dto.js'
import { AccountsController } from '../controllers/accounts.controller.js'
import { mongoIdSchema } from '../dtos/mongo.id.dto.js'
import { POLICIES } from '../constants/enums/index.js'
import { Router } from './router.js'
import { validate, validateParams } from 'express-joi-validations'

class AccountsRouter extends Router {
  constructor () {
    super()
    this.init()
  }

  init () {
    this.post(
      '/',
      [POLICIES.PUBLIC],
      validate({ body: accountReqSchema }),
      AccountsController.createAccount
    )

    this.get('/', [POLICIES.PUBLIC], AccountsController.getAccounts)

    this.get(
      '/:id',
      [POLICIES.PUBLIC],
      validateParams(mongoIdSchema),
      AccountsController.getAccountById
    )

    this.put(
      '/:id',
      [POLICIES.PUBLIC],
      validateParams(mongoIdSchema),
      validate({ body: accountReqSchema }),
      AccountsController.updateAccountById
    )

    this.delete(
      '/:id',
      [POLICIES.PUBLIC],
      validateParams(mongoIdSchema),
      AccountsController.deleteAccountById
    )
  }
}

export const accountsRouter = new AccountsRouter().router
