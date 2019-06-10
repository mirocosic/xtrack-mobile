import { get } from "lodash"

export const makeUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16)
  });
}

export const calculateTransactions = (transactions, transactionType, filter = { type: false, value: false }) => {
  if (transactions.length === 0) { return 0 }
  let filteredTransactions = []
  switch (filter.type) {
    case "account":
      filteredTransactions = transactions.filter((item)=>filter.value.id=== get(item ,"account.id") && item.type === transactionType);
      break;
    default:
      filteredTransactions = transactions.filter(item => item.type === transactionType);
  }

  if (filteredTransactions.length === 0) { return 0 }
  const total = filteredTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));

  return total.amount;
}

export const calculateIncome = (transactions, filter = { type: false, value: false }) => {
  return calculateTransactions(transactions, "income", filter)
}

export const calculateExpenses = (transactions, filter = { type: false, value: false }) => {
  return calculateTransactions(transactions, "expense", filter)
}
