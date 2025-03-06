import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { model, Schema } from 'mongoose'

const accountSchema = new Schema(
  {
    username: { type: String, required: true },
    amounts: {
      betano: { type: Number, default: 0 },
      bet365: { type: Number, default: 0 }
    }
  },
  {
    id: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

accountSchema.plugin(mongooseLeanVirtuals)

export const accountModel = model('account', accountSchema)
