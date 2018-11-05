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

const transactions = (state = initialState, action) => {

  switch(action.type){

    case "ADD_TRANSACTION":
      const { amount, type, note, category} = action.transaction;
      return {
        ...state,
        total: calculateTotal(state.total, amount, type, false),
        entries: [
          ...state.entries,
          {
            id: makeId(state.entries),
            type,
            amount,
            note,
            category
          }
        ]
      }

    case "DELETE_TRANSACTION":

      return {
        ...state,
        total: calculateTotal(state.total, action.transaction.amount, action.transaction.type, true),
        entries: state.entries.filter((item)=>{
          return item.id !== action.transaction.id
        })
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
