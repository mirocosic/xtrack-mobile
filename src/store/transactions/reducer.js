import initialState from './initial-state';

const makeId = (entries)=>{

  if (entries.length){
    return entries[entries.length-1].id+1
  } else {
    return 0
  }
}

const calculateTotal = (total, amount, type, inverse) => {
  if ( (type === "expense" && !inverse) || (type === "income" && inverse)) {
    return parseFloat(total) - parseFloat(amount)
  } else if ( (type === "income" && !inverse) || (type === "expense" && inverse)) {
    return parseFloat(total) + parseFloat(amount)
  } else {
    return total
  }
}

const calculateExpense = (total, amount, type, inverse) => {
  if (type === "income") {return total}
  if (!inverse) {
    return parseFloat(total) - parseFloat(amount)
  } else {
    return parseFloat(total) + parseFloat(amount)
  }
}

const calculateIncome = (total, amount, type, inverse) => {
  if (type === "expense") {return total}
  if (inverse) {
    return parseFloat(total) - parseFloat(amount)
  } else {
    const result = parseFloat(total) + parseFloat(amount);
    return result;
  }
}

const transactions = (state = initialState, action) => {

  if (action.transaction) {
    console.log(action.transaction);
    var { timestamp, account, amount, type, note, category, labels} = action.transaction;
  }


  switch(action.type){

    case "ADD_TRANSACTION":
      return {
        ...state,
        //total: calculateTotal(state.total, amount, type, false),
        //expenses: calculateExpense(state.expenses, amount, type, false),
        //income: calculateIncome(state.income, amount, type, false),
        entries: [
          ...state.entries,
          {
            id: makeId(state.entries),
            timestamp,
            account,
            type,
            amount,
            note,
            category,
            labels
          }
        ]
      }

    case "EDIT_TRANSACTION":

      return {
        ...state,
        entries: state.entries.map((item)=>{
          if (item.id !== action.transaction.id) return item;

          return {
            id: item.id,
            timestamp,
            account,
            type,
            amount,
            note,
            category,
            labels
          }
        })
      }

    case "SELECT_TRANSACTION":
      return {
        ...state,
        selectedTransaction: action.transaction
      }

    case "DELETE_TRANSACTION":
      return {
        ...state,
        total: calculateTotal(state.total, action.transaction.amount, action.transaction.type, true),
        expenses: calculateExpense(state.expenses, action.transaction.amount, action.transaction.type, true),
        income: calculateIncome(state.income, action.transaction.amount, action.transaction.type, true),
        entries: state.entries.filter((item)=>{
          return item.id !== action.transaction.id
        })
      }

    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{category: action.payload}
          }
        }

    case "SET_TYPE":
      return {
        ...state,
        selectedTransaction: {
          ...state.selectedTransaction,
          ...{type: action.transactionType}
          }
      }

    case "SET_TRANSFER_MODE":
      return {
        ...state,
        transferMode: action.value
      }

    case "ATTACH_LABEL":
      return {
        ...state,
        labels: [
          ...state.labels,
          action.payload
        ]
      }

    case "ERASE":
      return {
        ...initialState
      }

    default:
      return state;
  }

}

export default transactions;
