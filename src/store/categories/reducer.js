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
          ...state.items.map(item => {
            if (action.category.defaultCategory) {
              return {
                ...item,
                defaultCategory: false,
              } 
            } else {
              return item
            }
          }),
          {
            id: makeUUID(),
            name: action.category.name,
            budget: action.category.budget,
            type: action.category.type,
            icon: action.category.icon,
            color: action.category.color,
            defaultCategory: action.category.defaultCategory || state.items.length === 0,
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
      console.log(action.category)
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.category.id) {
            return {
              ...item,
              defaultCategory: false,
            }
          } else {
            return {
              ...item,
              defaultCategory: true
            }
          }
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

    case "RESTORE_BACKUP":
      return action.data.categories

    default:
      return state;
  }

}

export default categories;
