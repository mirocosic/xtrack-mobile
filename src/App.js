import React from "react"
import { StatusBar, Appearance } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import { DarkModeProvider } from "react-native-dark-mode"
import { get } from "lodash"
import changeNavigationBarColor from 'react-native-navigation-bar-color'

import palette from "./utils/palette"
import { persistor, store } from "./store"
import AppNavigator from "./navigators/app-navigator"
import "intl"
import "intl/locale-data/jsonp/en"

// if (!__DEV__) { Sentry.config("https://c5c6fad7bce3480fa962382c9a01ee1e@sentry.io/1427686").install() }

// get the appTheme from store, and if set to "system", update the status bar to provided systemTheme prop
const updateStatusBarStyle = (systemTheme) => {
  const state = store.getState();
  const appTheme = get(state, "common.theme")

  if (appTheme === "system") {
    if (systemTheme === "dark") {
      StatusBar.setBarStyle("light-content", true)
      changeNavigationBarColor(palette.darkGreyHex)
    } else {
      StatusBar.setBarStyle("dark-content", true)
      changeNavigationBarColor(palette.light)
    }
  }
}

// set initial status bar color
const systemTheme = Appearance.getColorScheme()
updateStatusBarStyle(systemTheme)

// register event listener for system changes.
Appearance.addChangeListener(event => {
  updateStatusBarStyle(event.colorScheme)
})

export default () => (
  <Provider store={store}>
    <DarkModeProvider>
      <PersistGate persistor={persistor}>

        <AppNavigator />

      </PersistGate>
    </DarkModeProvider>
  </Provider>
)
