import React from "react"
import { StatusBar } from "react-native"
import { Sentry } from "react-native-sentry"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import { DarkModeProvider } from "react-native-dark-mode"

import { persistor, store } from "./store"
import AppNavigator from "./navigators/app-navigator"
import Drawer from "./components/drawer"
import "intl"
import "intl/locale-data/jsonp/en"

if (!__DEV__) { Sentry.config("https://c5c6fad7bce3480fa962382c9a01ee1e@sentry.io/1427686").install() }

StatusBar.setBarStyle("light-content", true)

export default () => (
  <Provider store={store}>
    <DarkModeProvider>
      <PersistGate persistor={persistor}>
        <Drawer
          side="right"
          open
        >
          <AppNavigator />
        </Drawer>
      </PersistGate>
    </DarkModeProvider>
  </Provider>
)
