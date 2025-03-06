import { CustomError } from './CustomError.js'

export class BetNotFoundError extends CustomError {
  constructor () {
    super('Apuesta no encontrada', 400)
  }
}

export class InactiveBetError extends CustomError {
  constructor () {
    super('La apuesta ya no esta activa', 400)
  }
}
