import { AccountsService } from './account.service.js'
import { betModel } from '../models/bet.model.js'
import mongoose from 'mongoose'
import { PLATFORMS } from '../constants/enums/index.js'

export class BetsService {
  static async deleteBetById (id) {
    const bet = await betModel.findById(id).lean({ virtuals: true })
    const session = await mongoose.startSession()
    try {
      const deletedBet = await session.withTransaction(async function () {
        if (!bet.isFreeBet) {
          for (const account of bet.accounts) {
            await AccountsService.increaseAmountById(
              {
                id: account.id,
                amount: bet.amount,
                platform: PLATFORMS.BETANO
              },
              { session }
            )
          }
        }

        if (!bet.oppositeBet) {
          await betModel.findOneAndUpdate(
            { oppositeBet: id },
            {
              $unset: { oppositeBet: '', group: '' }
            }
          )
        } else {
          await betModel.findByIdAndUpdate(bet.oppositeBet.id, {
            $unset: { group: '' }
          })
        }

        return await betModel
          .findByIdAndDelete(id, { session })
          .lean({ virtuals: true })
      })
      return deletedBet
    } catch (error) {
      console.error(error)
      return
    } finally {
      session.endSession()
    }
  }

  static async updateBetById (id, { description }) {
    return await betModel
      .findByIdAndUpdate(id, { $set: { description } })
      .lean({ virtuals: true })
  }

  static async getBetById (id) {
    return await betModel.findById(id).lean({ virtuals: true })
  }

  static async findActiveByDescription (description) {
    return await betModel
      .findOne({ description, status: 'active' })
      .lean({ virtuals: true })
  }

  static async registerBet (bet) {
    const session = await mongoose.startSession()
    try {
      const newBetId = await session.withTransaction(async () => {
        console.log({ bet })
        if (bet.oppositeBet) {
          const oppositeBet = await this.registerBet(bet.oppositeBet)
          bet.oppositeBet = oppositeBet.id
        }
        console.log('hola')

        const [newBet] = await betModel.create([bet], { session })

        if (!bet.isFreeBet) {
          for (const accountID of bet.accounts) {
            await AccountsService.increaseAmountById(
              {
                id: accountID,
                amount: -bet.amount,
                platform: PLATFORMS.BETANO
              },
              { session }
            )
          }
        }
        return newBet.get('_id')
      })
      return betModel.findById(newBetId).lean({ virtuals: true })
    } catch (error) {
      console.error(error)
      return
    } finally {
      session.endSession()
    }
  }

  /**
	 *
	 * @param {any} id
	 * @param {Object} param
	 * @param {'won'| 'lost'} param.betResult
	 * @param {Boolean} [param.isOppositeBetResolved = false]
	 */
  static async resolveBetById (
    id,
    { betResult, isOppositeBetResolved = false }
  ) {
    const session = await mongoose.startSession()
    try {
      const responseBet = await session.withTransaction(async () => {
        const bet = await betModel
          .findByIdAndUpdate(id, { $set: { status: betResult } }, { new: true })
          .lean({ virtuals: true })

        if (betResult == 'won') {
          for (const account of bet.accounts) {
            await AccountsService.increaseAmountById(
              {
                id: account._id,
                platform: PLATFORMS.BETANO,
                amount:
									bet.amount * bet.odds - (bet.isFreeBet ? bet.amount : 0)
              },
              { session }
            )
          }
        }
        if (bet.group && !isOppositeBetResolved) {
          const oppositeBet =
						bet.oppositeBet ?? (await betModel.findOne({ oppositeBet: id }))

          console.log({ oppositeBet })

          oppositeBet &&
						(await this.resolveBetById(oppositeBet._id, {
						  betResult: betResult === 'won' ? 'lost' : 'won',
						  isOppositeBetResolved: true
						}))
        }

        return bet
      })
      return await betModel.findById(responseBet._id).lean({ virtuals: true })
    } catch (error) {
      console.error(error)
      return
    } finally {
      session.endSession()
    }
  }

  static async getBets (params) {
    const filter = {}
    for (const param in params) {
      filter[param] = params[param]
    }
    return await betModel.find(filter).lean({ virtuals: true })
  }
}
