import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    openOnForm: state.common.openOnForm,
    language: state.common.language,
    accounts: state.accounts.items,
    categories: state.categories.items,
  }),

  dispatch => ({
    toggleDarkMode: () => dispatch({ type: "TOGGLE_DARK_MODE" }),
    toggleOpenOnForm: () => dispatch({ type: "TOGGLE_OPEN_ON_FORM" }),
    setLanguage: language => dispatch({ type: "SWITCH_LANGUAGE", language }),
    erase: () => dispatch({ type: "ERASE" }),
    add: transaction => dispatch({ type: "ADD_TRANSACTION", transaction }),
  }),
)(Component);
