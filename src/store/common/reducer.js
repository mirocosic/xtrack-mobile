import initialState from "./initial-state";

const common = (state = initialState, action) => {
  switch (action.type) {

    case "SET_DARK_MODE":
      return {
        ...state,
        darkMode: action.value,
      }

    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      }

    case "TOGGLE_OPEN_ON_FORM":
      return {
        ...state,
        openOnForm: !state.openOnForm,
      }

    case "TOGGLE_ALL_TRANS":
      return {
        ...state,
        allTrans: !state.allTrans,
      }

    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.language,
      }

    case "SET_THEME":
      return {
        ...state,
        theme: action.theme,
      }

    case "ERASE":
      return initialState

    case "OPEN_DRAWER":
      return {
        ...state,
        drawerOpen: true,
        drawerContent: action.drawerContent,
        drawerIsCanceled: false,
      }

    case "CLOSE_DRAWER":
      return {
        ...state,
        drawerOpen: false,
        drawerIsCanceled: action.isCanceled,
      }

    case "RESTORE_BACKUP":
      return action.data.common

    default:
      return state;
  }

}

export default common;
