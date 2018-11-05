import initialState from './initial-state';

const makeId = (entries)=>{

  if (entries.length){
    return entries[entries.length-1].id+1
  } else {
    return 0
  }
}

const transactions = (state = initialState, action) => {
  switch(action.type){

    case "ADD_NEW_ENTRY":
      return {
        ...state,
        total: parseFloat(state.total)+parseFloat(action.payload.amount),
        entries: [
          ...state.entries,
          {id: makeId(state.entries), amount: action.payload.amount, note: action.payload.note}
        ]
      }

    case "DELETE_TRANSACTION":
      return {
        ...state,
        total: parseFloat(state.total) - parseFloat(action.transaction.amount),
        entries: state.entries.filter((item)=>{
          return item.id !== action.transaction.id
        })
      }

    default:
      return state;
  }

}

export default transactions;
