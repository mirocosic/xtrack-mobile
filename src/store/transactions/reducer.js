import initialState from './initial-state';

const transactions = (state = initialState, action) => {
  switch(action.type){

    case "ADD_NEW_ENTRY":
      return {
        ...state,
        entries: [
          ...state.entries,
          {id: state.entries[state.entries.length-1].id+1, amount: action.payload.amount, note: action.payload.note}
        ]
      }

    default:
      return state;
  }

}

export default transactions;
