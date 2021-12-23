import initialState from "./initial-state"
import { makeUUID } from "../../utils/helper-gnomes"

const labels = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_LABEL":
      return {
        ...state,
        items: [
          ...state.items,
          { id: makeUUID(), name: action.label.name, color: action.label.color },
        ],
      }

    case "EDIT_LABEL":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.label.id) return item;
          return action.label;
        }),
      }

    case "DELETE_LABEL":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }

    case "SELECT_LABEL":
      return {
        ...state,
        selectedLabel: action.payload,
      }

    case "APPLY_LABEL_FILTER":
      return {
        ...state,
        appliedLabelsFilter: [
          ...state.appliedLabelsFilter,
          action.label,
        ],
      }

    case "REMOVE_LABEL_FILTER":
      return {
        ...state,
        appliedLabelsFilter: state.appliedLabelsFilter.filter(label => label.id !== action.label.id),
      }

    case "RESET_FILTERS":
      return {
        ...state,
        appliedLabelsFilter: [],
      }

    case "ERASE":
      return { ...initialState }

    case "RESTORE_BACKUP":
      return action.data.labels

    default:
      return state;
  }

}

export default labels;
