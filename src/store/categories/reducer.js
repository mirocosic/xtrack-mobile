import initialState from "./initial-state"
import { makeUUID } from "../../utils/helper-gnomes"

const categories = (state = initialState, action) => {
  switch (action.type) {

    // TODO: check if this is extra?
    case "ADD_NEW_CATEGORY":
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: state.items[state.items.length - 1].id + 1,
            name: action.payload.name,
            note: action.payload.note,
          },
        ],
      }

    case "ADD_CATEGORY":
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: makeUUID(),
            name: action.category.name,
            budget: action.category.budget,
            type: action.category.type,
            icon: action.category.icon,
            color: action.category.color,
            defaultCategory: state.items.length === 0,
          },
        ],
      }

    case "EDIT_CATEGORY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.category.id) return item;
          return action.category;
        }),
      }

    case "REMOVE_CATEGORY":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.category.id),
      }

    case "SET_DEFAULT_CATEGORY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.category.id) {
            return {
              ...item,
              defaultCategory: false,
            }
          }
          return action.category;
        }),
      }

    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      }

    case "CLEAR_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: {},
      }

    case "CHANGE_CATEGORY_FILTER":
      return {
        ...state,
        categoryFilter: action.category,
      }

    case "RESET_FILTERS":
      return {
        ...state,
        categoryFilter: false,
      }

    case "ERASE":
      return { ...initialState }

    default:
      return state;
  }

}

export default categories;
