import React from 'react'
import { HorizontalNavBar } from '../components/layouts/HorizontalNavBar.jsx'
import { RegisterBetForm } from '../components/Forms/RegisterBetForm.jsx'

export function RegisterBet () {
  return (
    <div className='w-screen flex flex-col items-center justify-center gap-9'>
      <RegisterBetForm />
      <HorizontalNavBar prevPage='bets' />
    </div>
  )
}
