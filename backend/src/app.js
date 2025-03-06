import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { apiRouter } from './routes/indes.js'
import { CONFIG } from './config/config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { engine } from 'express-handlebars'
import express from 'express'
import { expressJoiValidations } from 'express-joi-validations'
import Handlebars from 'handlebars'
import { initializePassport } from './auth/passport.init.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'

const app = express()
const PORT = CONFIG.PORT || 8000

// CORS
app.use(cors({ origin: CONFIG.FRONTEND_URL, credentials: true }))

// EXPRESS
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./src/public'))

// EXPRESS-JOI-VALIDATIONS
app.use(expressJoiValidations({ overwriteRequest: true, throwErrors: true }))

// COOKIE-PARSER
app.use(cookieParser())

// PASSPORT
app.use(passport.initialize())
initializePassport()

// HANDLEBARS
app.set('view engine', 'handlebars')
app.set('views', './src/views')
app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
)

// MORGAN
app.use(morgan('dev'))

// ROUTES
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}`)
});

// MONGODB
(async () => {
  try {
    await mongoose.connect(CONFIG.MONGO.URL, {
      dbName: CONFIG.MONGO.DB_NAME
    })
    console.log('Conexión con MongoDB establecida')
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`)
  }
})()
