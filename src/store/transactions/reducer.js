import moment from "moment"
import { get, reject } from "lodash"
import initialState from "./initial-state";
import { makeUUID } from "../../utils/helper-gnomes"

const transactions = (state = initialState, action) => {

  const transaction = action.transaction || {}
  const { timestamp, accountId, fromAccountId, amount, note, categoryId, labels, parentTransactionId } = transaction
  const newId = makeUUID()

  switch (action.type) {

    case "ADD_TRANSACTION":
      return {
        ...state,
        entries: [
          ...state.entries,
          {
            ...transaction,
            id: newId,
            parentTransactionId: parentTransactionId || newId,
          },
        ],
      }

    case "EDIT_TRANSACTION":
      return {
        ...state,
        entries: state.entries.map((item) => {
          if (item.id !== transaction.id) { return item }

          return transaction
        }),
      }

    case "EDIT_ALL_RECURRING_TRANSACTIONS":
      return {
        ...state,
        entries: state.entries.map((item) => {
          if (item.parentTransactionId !== transaction.parentTransactionId) { 
            return item
          } else if (item.id === transaction.id) {
            return transaction
          } else {
            return {
              ...transaction,
              id: item.id,
              timestamp: item.timestamp
            }
          }
        })
      }

    case "EDIT_FUTURE_RECURRING_TRANSACTIONS":
      return {
        ...state,
        entries: state.entries.map((item) => {
          if (item.parentTransactionId !== transaction.parentTransactionId) {
            return item 
          } else if (item.timestamp > transaction.timestamp) {
            return {
              ...transaction,
              id: item.id,
              timestamp: item.timestamp
            }
          } else {
            return item
          }
        }),
      }

    case "SELECT_TRANSACTION":
      return {
        ...state,
        selectedTransaction: action.transaction,
      }

    case "DELETE_TRANSACTION":
      return {
        ...state,
        entries: reject(state.entries, item => item.id === action.transaction.id || item.parentTransactionId === action.transaction.id)
      }

    case "REMOVE_ALL_RECURRING_TRANSACTIONS":

      // delete called on child transaction
      if (action.transaction.parentTransactionId) {
        return {
          ...state,
          entries: state.entries.filter(
            item => item.parentTransactionId !== action.transaction.parentTransactionId,
          ).filter(item => item.id !== action.transaction.parentTransactionId),
        }
      }

      // delete called on parent transaction
      return {
        ...state,
        entries: state.entries.filter(item => item.id !== action.transaction.id).filter(item => item.parentTransactionId !== action.transaction.id),
      }

    case "REMOVE_FUTURE_RECURRING_TRANSACTIONS":

      // delete called on child transaction
      if (action.transaction.parentTransactionId) {
        return {
          ...state,
          entries: state.entries.filter(
            item => item.parentTransactionId !== action.transaction.parentTransactionId || item.timestamp < action.transaction.timestamp,
          ).filter(item => item.id !== action.transaction.parentTransactionId || item.timestamp < action.transaction.timestamp),
        }
      }

      // delete called on parent transaction
      return {
        ...state,
        entries: state.entries.filter(item => item.id !== action.transaction.id || item.timestamp < action.transaction.timestamp).filter(item => item.parentTransactionId !== action.transaction.id || item.timestamp < action.transaction.timestamp),
      }

    case "TRANSFER_TRANSACTION":
      const transferTransactionId = makeUUID()
      return {
        ...state,
        entries: [
          ...state.entries,
          {
            id: makeUUID(),
            timestamp,
            accountId: fromAccountId,
            fromAccountId: accountId,
            type: "expense",
            isTransfer: true,
            amount: amount,
            note,
            categoryId,
            labels,
            parentTransactionId: transferTransactionId
          },
          {
            id: makeUUID(),
            timestamp,
            accountId,
            fromAccountId,
            type: "income",
            isTransfer: true,
            amount,
            note,
            categoryId,
            labels,
            parentTransactionId: transferTransactionId
          },
          {
            id: transferTransactionId,
            timestamp,
            accountId,
            fromAccountId,
            type: "transfer",
            isTransfer: false, //hack for calculations, not needed if transaction type is transfer
            amount,
            note,
            categoryId,
            labels,
          },
        ],
      }

    case "SET_TRANSFER_MODE":
      return {
        ...state,
        transferMode: action.value,
      }

    case "CLEAR_TRANSACTION_FORM":
      return {
        ...state,
        selectedTransaction: {
          timestamp: moment.now(),
          amount: 0,
          note: "",
          type: "expense",
          categoryId: get(action, "defaultCategory.id"),
          accountId: get(action, "defaultAccount.id"),
          fromAccountId: {},
          labels: [],
          recurring: false,
        },
      }

    case "CHANGE_MONTH_FILTER":
      return {
        ...state,
        currentMonth: action.month,
      }

    case "ERASE":
      return { ...initialState }

    case "REMOVE_CATEGORY_TRANSACTIONS":
      return {
        ...state,
        entries: state.entries.filter(item => item.categoryId !== action.category.id),
      }

    case "REMOVE_ACCOUNT_TRANSACTIONS":
      return {
        ...state,
        entries: state.entries.filter(item => item.accountId !== action.account.id),
      }

    // prototype restore, not real thing
    case "RESTORE_BACKUP":
      //console.log(action.data.transactions.entries)
      return action.data.transactions

    default:
      return state;
  }

}

export default transactions;
