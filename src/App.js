import React from "react"
import { StatusBar, Appearance } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import { DarkModeProvider } from "react-native-dark-mode"
import { get } from "lodash"

import { persistor, store } from "./store"
import AppNavigator from "./navigators/app-navigator"
import "intl"
import "intl/locale-data/jsonp/en"

// if (!__DEV__) { Sentry.config("https://c5c6fad7bce3480fa962382c9a01ee1e@sentry.io/1427686").install() }


// set initial status bar color

const systemTheme = Appearance.getColorScheme()
if (theme === "system") {

  if (systemTheme === "dark") {
    StatusBar.setBarStyle("light-content", true)
  } else {
    StatusBar.setBarStyle("dark-content", true)
  }
}

// register event listener for system changes.
Appearance.addChangeListener(event => {
  const state = store.getState();
  const theme = get(state, "common.theme")

  if (theme === "system") {
    if (event.colorScheme === "dark") {
      StatusBar.setBarStyle("light-content", true)
    } else {
      StatusBar.setBarStyle("dark-content", true)
    }
  }
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
