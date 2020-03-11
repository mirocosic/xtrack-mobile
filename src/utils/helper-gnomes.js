import { get } from "lodash"
import moment from "moment"

export const makeUUID = () => (
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === "x" ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  }))

export const calcAmount = (transaction) => {
  switch (transaction.currency) {
    case "EUR":
      return 7.55 * parseFloat(transaction.amount)
    case "USD":
      return 6.66 * parseFloat(transaction.amount)
    default:
      return parseFloat(transaction.amount)
  }
}

export const calculateTransactions = (transactions, transactionType, filter = { type: false, value: false }, normalize) => {
  if (transactions.length === 0) { return 0 }
  let filteredTransactions = []
  switch (filter.type) {
    case "account":
      filteredTransactions = transactions.filter(item => filter.value.id === get(item, "accountId") && item.type === transactionType)
      break;

    case "month":
      filteredTransactions = transactions.filter(t => moment(t.timestamp) > moment(filter.value).startOf("month")
                                                      && moment(t.timestamp) < moment(filter.value).endOf("month")
                                                      && t.type === transactionType)
      break
    default:
      filteredTransactions = transactions.filter(item => item.type === transactionType);
  }

  // filter future transactions
  const pastTransactions = filteredTransactions.filter(item => moment(item.timestamp) <= moment())

  if (pastTransactions.length === 0) { return 0 }

  let total

  if (normalize) {
    total = pastTransactions.reduce((acc, transaction) => acc + calcAmount(transaction), 0)
  } else {
    total = pastTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
  }

  return total
}

export const calculateIncome = (transactions, filter = { type: false, value: false }, normalize = false) => (
  calculateTransactions(transactions, "income", filter, normalize)
)

export const calculateExpenses = (transactions, filter = { type: false, value: false }, normalize = false) => (
  calculateTransactions(transactions, "expense", filter, normalize)
)
