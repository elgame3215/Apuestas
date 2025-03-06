export async function fetchAccounts () {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/accounts`, {
    credentials: 'include'
  })
  const data = await response.json()
  return { data: data.payload, status: response.status }
}
