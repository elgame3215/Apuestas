import { CONFIG } from '../config/config.js'

const { BACKEND_URL } = CONFIG

export async function fetchAccounts () {
  console.log('backend url: ', BACKEND_URL)
  const response = await fetch(`${BACKEND_URL}/api/accounts`, {
    credentials: 'include'
  })
  const data = await response.json()
  return { data: data.payload, status: response.status }
}
