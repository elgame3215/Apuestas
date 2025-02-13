export async function fetchAmounts() {
  const response = await fetch(`/api/accounts`, {
    credentials: "include",
  });
  const data = await response.json();
  return { data: data.payload, status: response.status };
}
