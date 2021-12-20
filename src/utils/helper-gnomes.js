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
      filteredTransactions = transactions.filter(item => (filter.value.id === get(item, "accountId") || filter.value.id === get(item, "fromAccountId")) && item.type === transactionType && !item.isTransfer)
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

  // when I fix the multiple currencies thingy
  // if (normalize) {
  //   total = pastTransactions.reduce((acc, transaction) => acc + calcAmount(transaction), 0)
  // } else {
  //   total = pastTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
  // }

  return pastTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)

}

export const calculateIncome = (transactions, filter = { type: false, value: false }, normalize = false) => (
  calculateTransactions(transactions, "income", filter, normalize)
)

export const calculateExpenses = (transactions, filter = { type: false, value: false }, normalize = false) => (
  calculateTransactions(transactions, "expense", filter, normalize)
)

export const calculateTransfers = (transactions, filter = { type: false, value: false }, normalize = false) => {
  //calculateTransactions(transactions, "transfer", filter, normalize)
  const transferExpenses = transactions
                      .filter(item => filter.value.id === get(item, "accountId") && item.type === "expense" && item.isTransfer)
                      .filter(item => moment(item.timestamp) <= moment())
  const transferIncome = transactions
                    .filter(item => (filter.value.id === get(item, "accountId")) && item.type === "income" && item.isTransfer)
                    .filter(item => moment(item.timestamp) <= moment())

  const totalExpenses = transferExpenses.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
  const totalIncome = transferIncome.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
  return totalIncome - totalExpenses
}

