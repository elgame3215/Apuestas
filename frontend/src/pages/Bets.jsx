import React from 'react'
import { CardsContainer } from '../components/Cards/CardsContainer.jsx'
import { HorizontalNavBar } from '../components/layouts/HorizontalNavBar.jsx'

export function Bets () {
  return (
    <div className='flex flex-col h-screen justify-evenly items-center'>
      <CardsContainer />
      <HorizontalNavBar prevPage='home' />
    </div>
  )
}
