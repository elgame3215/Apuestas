import { accountsRouter } from './accounts.routes.js'
import { authRouter } from './auth.routes.js'
import { betsRouter } from './bets.routes.js'
import { CustomError } from '../errors/CustomError.js'
import { Router } from 'express'
import { ValidationError } from 'express-joi-validations'

const apiRouter = Router()
apiRouter.use('/accounts', accountsRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/bets', betsRouter)

// ERROR HANDLING
apiRouter.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    console.error(err)
    return res.status(400).json({ success: false, message: err.message })
  }

  if (err instanceof CustomError) {
    return res.status(err.code).json({ success: false, message: err.message })
  }

  console.error(err)
  throw err
})

export { apiRouter }
