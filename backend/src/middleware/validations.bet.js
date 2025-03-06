import { AccountNotFoundError } from '../errors/account.errors.js'
import { AccountsService } from '../services/account.service.js'
import { BET_STATES } from '../constants/enums/index.js'
import { BetsService } from '../services/bets.service.js'
import { BetNotFoundError, InactiveBetError } from '../errors/bet.errors.js'

export async function validateBetAccounts (req, res, next) {
  const { accounts: ids } = req.body
  const accounts = await AccountsService.getAccounts()

  if (!ids.every(id => accounts.map(account => account.id).includes(id))) {
    return next(new AccountNotFoundError())
  }
  return next()
}

export async function validateActiveBet (req, res, next) {
  const { id } = req.params
  const bet = await BetsService.getBetById(id)
  if (!bet) {
    return next(new BetNotFoundError())
  }
  if (bet.status != BET_STATES.ACTIVE) {
    return next(new InactiveBetError())
  }
  return next()
}
