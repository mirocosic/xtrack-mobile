import initialState from "./initial-state";

const makeId = (items) => {
  return (items.length) ? items[items.length - 1].id + 1 : 0
}
const categories = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_ACCOUNT":
      return {
        ...state,
        items: [
          ...state.items,
          { id: makeId(state.items), name: action.payload },
        ],
      }

    case "DELETE_ACCOUNT":
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.id !== action.payload
        }),
      }

    case "SELECT_TO_ACCOUNT":
      return {
        ...state,
        toAccount: action.payload,
      }

    case "SELECT_FROM_ACCOUNT":
      return {
        ...state,
        fromAccount: action.payload,
      }

    case "CHANGE_ACCOUNT_FILTER":
      return {
        ...state,
        accountFilter: action.account,
      }

    case "ERASE":
      return {
        ...initialState
      }

    default:
      return state;
  }

}

export default categories;
