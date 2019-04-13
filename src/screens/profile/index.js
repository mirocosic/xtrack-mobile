import { connect } from "react-redux";
import Component from "./component";

export default connect(
  (state) => {
    return {
      darkMode: state.common.darkMode,
      language: state.common.language
    }
  },

  (dispatch) => {
    return {
      toggleDarkMode: ()=>dispatch({type: "TOGGLE_DARK_MODE"}),
      setLanguage: (language)=>dispatch({type:"SET_LANGUAGE", language}),
      erase: ()=>dispatch({type: "ERASE"})
    }
  }
)(Component);
