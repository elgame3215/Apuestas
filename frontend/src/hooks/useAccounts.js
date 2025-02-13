import { useEffect, useState } from "react";
import { fetchAmounts } from "../services/fetchAmounts.js";

/**
 *
 * @param {Object} param
 * @param {Function} param.formatter
 * @param {Function} param.setCount
 * @returns
 */
export function useAccounts({ formatter, setCount }) {
  const [accounts, setAccounts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAmounts() {
      try {
        const { data, status } = await fetchAmounts();
        if (status === 401) {
          window.location.href = "/login";
          return;
        }
        setCount(data.length);
        if (formatter) {
          setAccounts(formatter(data));
          return;
        }
        setAccounts(data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }
    loadAmounts();
  }, []);
  async function updateAccount({ account, username }) {
    console.log({ username });
    return await fetch(`/api/accounts/${username ?? account.username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    });
  }

  async function registerAccount({ account }) {
    return await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    });
  }

  async function deleteAccount({ username }) {
    return await fetch(`/api/accounts/${username}`, {
      method: "DELETE",
    });
  }
  return {
    accounts,
    setAccounts,
    registerAccount,
    updateAccount,
    deleteAccount,
    error,
  };
}
