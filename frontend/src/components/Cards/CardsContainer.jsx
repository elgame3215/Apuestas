import React, { useEffect } from 'react'
import { BetCard } from './BetCard.jsx'
import { useBets } from '../../hooks/useBets.js'
import { Link } from 'react-router-dom'
import { COLORS } from '../../constants/colors.js'

export function CardsContainer () {
  const { bets, loading, error, getBets } = useBets()

  useEffect(() => {
    getBets()
  }, [])

  if (loading) return <h1 className='text-green'>Cargando...</h1>
  if (error) return <h1 className='text-green'>Error</h1>

  const activeBets = bets.filter(bet => bet.status === 'active')

  const activeBetCardsNode = activeBets.map(bet => {
    const { group, description, accounts, amount, odds, oppositeBet, pay, id } = bet
    return (
      <BetCard
        group={group}
        description={description}
        accounts={accounts}
        amount={amount}
        odds={odds}
        oppositeBet={oppositeBet}
        betID={id}
        pay={pay}
        key={id}
      />
    )
  })
  return (
    <main className='flex flex-col items-center gap-9'>
      <Link
        to='/new-bet'
        style={{
          marginBottom: 16,
          backgroundColor: COLORS.BACKGROUND,
          color: COLORS.GREEN,
          borderRadius: 5,
          padding: 6,
          border: `.05rem solid ${COLORS.GREEN}`
        }}
      >
        Agregar apuesta
      </Link>
      {activeBets.length
        ? (
            activeBetCardsNode
          )
        : (
          <h1 className='text-green'>No hay apuestas</h1>
          )}
    </main>
  )
}
