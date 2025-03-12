import { useState } from 'react'
import { fetchBets } from '../services/bets.js'
import { useNavigate } from 'react-router-dom'
import { CONFIG } from '../config/config.js'

const { BACKEND_URL } = CONFIG

export function useBets () {
  const navigate = useNavigate()
  const [bets, setBets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function getBets () {
    try {
      const { bets, status } = await fetchBets()
      if (status == 401) {
        navigate('/login')
        return
      }
      setBets(bets)
      console.log({ bets })
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  async function registerBet (bet) {
    const response = await fetch(`${BACKEND_URL}/api/bets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bet)
    })
    return await response.json()
  }

  async function resolveBet (betID, { betResult }) {
    const body = { betResult }
    const response = await fetch(`${BACKEND_URL}/api/bets/resolve/${betID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return await response.json()
  }

  async function cancelBet (betID) {
    const response = await fetch(`${BACKEND_URL}/api/bets/${betID}`, {
      method: 'DELETE'
    })
    return await response.json()
  }
  return { bets, getBets, registerBet, resolveBet, cancelBet, error, loading }
}
