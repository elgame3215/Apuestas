import { AccountsService } from './account.service.js';
import { betModel } from '../models/bet.model.js';
import mongoose from 'mongoose';

export class BetsService {
	static async getBetById(id) {
		return await betModel.findById(id).lean({ virtuals: true });
	}

	static async findActiveByDescription(description) {
		return await betModel
			.findOne({ description, status: 'active' })
			.lean({ virtuals: true });
	}

	static async registerBet(bet) {
		const session = await mongoose.startSession();
		try {
			const responseBet = await session.withTransaction(async function () {
				if (bet.oppositeBet) {
					const oppositeBet = await BetsService.registerBet(bet.oppositeBet);
					bet.oppositeBet = oppositeBet.id;
				}

				const [newBet] = await betModel.create([bet], { session });
				for (const accountID of bet.accounts) {
					await AccountsService.increaseAmountById(
						{
							id: accountID,
							amount: -newBet.amount,
							platform: 'betano',
						},
						{ session }
					);
				}
				return newBet;
			});
			return await betModel.findById(responseBet._id).lean({ virtuals: true });
		} catch (error) {
			console.error(error);
			return;
		} finally {
			session.endSession();
		}
	}

	/**
	 *
	 * @param {any} id
	 * @param {Object} param
	 * @param {'won'| 'lost'} param.betResult
	 * @param {Boolean} param.isOppositeBetResolved
	 */
	static async resolveBetById(id, { betResult, isOppositeBetResolved }) {
		const bet = await betModel.findById(id);
		const session = await mongoose.startSession();
		try {
			const responseBet = await session.withTransaction(async () => {
				bet.$set({ status: betResult });

				if (betResult == 'won') {
					for (const account of bet.accounts) {
						await AccountsService.increaseAmountById(
							{
								id: account._id,
								platform: 'betano',
								amount: bet.amount * bet.odds,
							},
							{ session }
						);
					}
				}
				const updatedBet = await bet.save({ session });

				if (!isOppositeBetResolved) {
					const oppositeBet =
						bet.oppositeBet ?? (await betModel.findOne({ oppositeBet: id }));

					await this.resolveBetById(oppositeBet._id, {
						betResult: betResult === 'won' ? 'lost' : 'won',
						isOppositeBetResolved: true,
					});
				}

				return updatedBet;
			});
			return await betModel.findById(responseBet._id).lean({ virtuals: true });
		} catch (error) {
			console.error(error);
			return;
		} finally {
			session.endSession();
		}
	}

	static async getBets() {
		return await betModel.find().lean({ virtuals: true });
	}
}
