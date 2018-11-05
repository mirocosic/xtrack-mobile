import initialState from './initial-state';

const common = (state = initialState, action) => {
  switch(action.type){

    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode
      }

    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.language
      }

    default:
      return state;
  }

}

export default common;
