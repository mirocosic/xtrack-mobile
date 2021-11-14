import { StatusBar, Appearance } from "react-native";
import { connect } from "react-redux";
import Component from "./component";

const changeStatusBar = (theme) => {
  switch (theme) {
    case "dark":
      StatusBar.setBarStyle("light-content", true)
      break;
    case "light":
      StatusBar.setBarStyle("dark-content", true)
      break;
    case "system":
      const systemTheme = Appearance.getColorScheme()
      if (systemTheme === "dark") {
        StatusBar.setBarStyle("light-content", true)
      } else {
        StatusBar.setBarStyle("dark-content", true)
      }
      break;
    default:
      return;
  }
}

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    theme: state.common.theme,
    openOnForm: state.common.openOnForm,
    language: state.common.language,
    theme: state.common.theme,
    accounts: state.accounts.items,
    categories: state.categories.items,
  }),

  dispatch => ({
    toggleDarkMode: () => dispatch({ type: "TOGGLE_DARK_MODE" }),
    toggleOpenOnForm: () => dispatch({ type: "TOGGLE_OPEN_ON_FORM" }),
    setLanguage: language => dispatch({ type: "SWITCH_LANGUAGE", language }),
    setTheme: theme => {
      changeStatusBar(theme)
      dispatch({ type: "SET_THEME", theme })},
    erase: () => dispatch({ type: "ERASE" }),
    add: transaction => dispatch({ type: "ADD_TRANSACTION", transaction }),
  }),
)(Component);
