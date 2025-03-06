import { betPostReqSchema } from '../dtos/bets/body/req.post.bet.dto.js'
import { BetsController } from '../controllers/bets.controller.js'
import { BetsService } from '../services/bets.service.js'
import { betUpdateReqSchema } from '../dtos/bets/body/req.update.bet.dto.js'
import { POLICIES } from '../constants/enums/index.js'
import { resolveBetReqSchema } from '../dtos/bets/body/res.resolve.bet.dto.js'
import { Router } from './router.js'
import { validateBody } from 'express-joi-validations'
import {
  validateActiveBet,
  validateBetAccounts
} from '../middleware/validations.bet.js'

class BetsRouter extends Router {
  constructor () {
    super()
  }

  init () {
    this.param('id', async (req, res, next, id) => {
      req.bet = await BetsService.getBetById(id)
      return next()
    })

    this.get('/', [POLICIES.PUBLIC], BetsController.getBets)

    this.get('/:id', [POLICIES.PUBLIC], BetsController.getBetById)

    this.post(
      '/',
      [POLICIES.PUBLIC],
      validateBody(betPostReqSchema),
      validateBetAccounts,
      BetsController.registerBet
    )

    this.post(
      '/resolve/:id',
      [POLICIES.PUBLIC],
      validateActiveBet,
      validateBody(resolveBetReqSchema),
      BetsController.resolveBet
    )

    this.put(
      '/:id',
      [POLICIES.PUBLIC],
      validateBody(betUpdateReqSchema),
      BetsController.updateBet
    )

    this.delete(
      '/:id',
      [POLICIES.PUBLIC],
      validateActiveBet,
      BetsController.deleteBetById
    )
  }
}

export const betsRouter = new BetsRouter().router
