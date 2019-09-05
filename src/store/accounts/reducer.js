import initialState from "./initial-state";

const makeId = items => (items.length ? items[items.length - 1].id + 1 : 0)

const categories = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_ACCOUNT": {
      const { name, icon, color, defaultAccount, startingBalance } = action.account
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: makeId(state.items),
            name,
            icon,
            color,
            defaultAccount,
            startingBalance,
          },
        ],
      }
    }

    case "EDIT_ACCOUNT":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.account.id) return item;
          return action.account;
        }),
      }

    case "REMOVE_ACCOUNT":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.account.id),
      }

    case "SET_DEFAULT_ACCOUNT":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.account.id) {
            return {
              ...item,
              defaultAccount: false,
            }
          }
          return action.account;
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

    case "RESET_FILTERS":
      return {
        ...state,
        accountFilter: false,
      }

    case "ERASE":
      return { ...initialState }

    default:
      return state;
  }

}

export default categories;
