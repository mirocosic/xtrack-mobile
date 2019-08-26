import moment from "moment"
import initialState from "./initial-state";
import { makeUUID } from "../../utils/helper-gnomes"

const makeId = entries => (entries.length ? entries[entries.length - 1].id + 1 : 1)
const transactions = (state = initialState, action) => {

  const transaction = action.transaction || {}
  const { timestamp, account, fromAccount, amount, type, note, category, labels } = transaction

  switch (action.type) {

    case "ADD_TRANSACTION":
      return {
        ...state,
        entries: [
          ...state.entries,
          {
            id: makeId(state.entries),
            timestamp,
            account,
            fromAccount,
            type,
            amount,
            note,
            category,
            labels,
          },
        ],
      }

    case "EDIT_TRANSACTION":

      return {
        ...state,
        entries: state.entries.map((item) => {
          if (item.id !== action.transaction.id) return item;

          return {
            id: item.id,
            timestamp,
            account,
            type,
            amount,
            note,
            category,
            labels,
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
        entries: state.entries.filter(item => item.id !== action.transaction.id),
      }

    case "TRANSFER_TRANSACTION":
      return {
        ...state,
        entries: [
          ...state.entries,
          {
            id: makeId(state.entries),
            timestamp,
            account: fromAccount,
            fromAccount: account,
            type,
            amount: -amount,
            note,
            category,
            labels,
          },
          {
            id: makeId(state.entries) + 1,
            timestamp,
            account,
            fromAccount,
            type,
            amount,
            note,
            category,
            labels,
          },
        ],
      }

    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{ category: action.payload },
        },
      }

    case "ATTACH_LABEL":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{
            labels: [
              ...state.selectedTransaction.labels,
              { uuid: makeUUID(), ...action.payload },
            ],
          },
        },
      }

    case "REMOVE_LABEL":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{ labels: state.selectedTransaction.labels.filter(label => label.uuid !== action.label.uuid) },
        },
      }

    case "SELECT_TO_ACCOUNT":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{ account: action.payload },
        },
      }

    case "SELECT_FROM_ACCOUNT":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{ fromAccount: action.payload },
        },
      }

    case "CHANGE_TRANSACTION_AMOUNT":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          amount: action.amount,
        },
      }

    case "SET_TYPE":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{ type: action.transactionType },
        },
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
          category: action.defaultCategory,
          account: action.defaultAccount,
          fromAccount: {},
          labels: [],
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
        entries: state.entries.filter(item => item.category.id !== action.category.id),
      }

    default:
      return state;
  }

}

export default transactions;
