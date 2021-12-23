import { StatusBar, Appearance } from "react-native";
import { connect } from "react-redux";
import Component from "./component";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import palette from "../../utils/palette"
import { isAndroid } from "../../utils/os-utils"

const changeStatusBar = (theme) => {
  switch (theme) {
    case "dark":
      StatusBar.setBarStyle("light-content", true)
      isAndroid && StatusBar.setBackgroundColor(palette.darkGreyHex, true)
      changeNavigationBarColor(palette.darkGreyHex)
      break;
    case "light":
      StatusBar.setBarStyle("dark-content", true)
      isAndroid && StatusBar.setBackgroundColor(palette.light, true)
      changeNavigationBarColor(palette.light)
      break;
    case "system":
      const systemTheme = Appearance.getColorScheme()
      if (systemTheme === "dark") {
        StatusBar.setBarStyle("light-content", true)
        isAndroid && StatusBar.setBackgroundColor(palette.darkGreyHex, true)
        changeNavigationBarColor(palette.darkGreyHex)
      } else {
        StatusBar.setBarStyle("dark-content", true)
        isAndroid && StatusBar.setBackgroundColor(palette.light, true)
        changeNavigationBarColor(palette.light)
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
    allTrans: state.common.allTrans,
    language: state.common.language,
    theme: state.common.theme,
    accounts: state.accounts.items,
    categories: state.categories.items,
    appVersion: state.common.appVersion,
  }),

  dispatch => ({
    toggleDarkMode: () => dispatch({ type: "TOGGLE_DARK_MODE" }),
    toggleOpenOnForm: () => dispatch({ type: "TOGGLE_OPEN_ON_FORM" }),
    toggleAllTrans: () => dispatch({ type: "TOGGLE_ALL_TRANS" }),
    setLanguage: language => dispatch({ type: "SET_LANGUAGE", language }),
    setTheme: theme => {
      changeStatusBar(theme)
      dispatch({ type: "SET_THEME", theme })},
    erase: () => dispatch({ type: "ERASE" }),
    add: transaction => dispatch({ type: "ADD_TRANSACTION", transaction }),
  }),
)(Component);
