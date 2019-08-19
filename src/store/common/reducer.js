import initialState from "./initial-state";

const common = (state = initialState, action) => {
  switch (action.type) {

    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      }

    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.language,
      }

    case "ERASE":
      return {
        ...initialState,
      }

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


    default:
      return state;
  }

}

export default common;
