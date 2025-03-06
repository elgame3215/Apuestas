import React from 'react'
import { HorizontalNavBar } from '../components/layouts/HorizontalNavBar.jsx'
import { AccountsTable } from '../components/Tables/AccountsTable.jsx'

export function Balance () {
  return (
    <div className='flex flex-col h-screen w-screen justify-evenly items-center'>
      <AccountsTable />
      <HorizontalNavBar prevPage='home' />
    </div>
  )
}
