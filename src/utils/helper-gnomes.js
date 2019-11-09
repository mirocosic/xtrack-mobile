import { get } from "lodash"
import moment from "moment"

export const makeUUID = () => (
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === "x" ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  }))

export const calculateTransactions = (transactions, transactionType, filter = { type: false, value: false }) => {
  if (transactions.length === 0) { return 0 }
  let filteredTransactions = []
  switch (filter.type) {
    case "account":
      filteredTransactions = transactions.filter(item => filter.value.id === get(item, "account.id") && item.type === transactionType)
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
  const total = pastTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));

  return total.amount;
}

export const calculateIncome = (transactions, filter = { type: false, value: false }) => (
  calculateTransactions(transactions, "income", filter)
)

export const calculateExpenses = (transactions, filter = { type: false, value: false }) => (
  calculateTransactions(transactions, "expense", filter)
)
