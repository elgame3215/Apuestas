import { BET_STATES } from '../constants/enums/index.js'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { model, Schema } from 'mongoose'

const betSchema = new Schema(
  {
    group: String,
    description: { type: String, required: true },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'account', required: true }],
    amount: { type: Number, required: true },
    odds: { type: Number, required: true },
    isFreeBet: { type: Boolean, default: false, required: true },
    status: {
      type: String,
      default: 'active',
      enum: Object.values(BET_STATES)
    },
    oppositeBet: { type: Schema.Types.ObjectId, ref: 'bet' }
  },
  {
    id: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

betSchema.virtual('pay').get(function () {
  const pay = this.amount * this.odds - (this.isFreeBet ? this.amount : 0)
  return Math.round(pay)
})

betSchema.plugin(mongooseLeanVirtuals)

betSchema.pre('find', function () {
  this.populate('oppositeBet')
  this.populate('accounts')
})

betSchema.pre('findOne', function () {
  this.populate('oppositeBet')
  this.populate('accounts')
})

betSchema.pre('updateOne', function () {
  this.populate('oppositeBet')
  this.populate('accounts')
})

betSchema.pre('updateMany', function () {
  this.populate('oppositeBet')
  this.populate('accounts')
})

betSchema.pre('findOneAndUpdate', function () {
  this.populate('oppositeBet')
  this.populate('accounts')
})

betSchema.pre('findOneAndDelete', function () {
  this.populate('oppositeBet')
  this.populate('accounts')
})

betSchema.pre('deleteOne', function () {
  this.populate('oppositeBet')
  this.populate('accounts')
})

export const betModel = model('bet', betSchema)
