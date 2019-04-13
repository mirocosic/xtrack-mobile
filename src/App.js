import React from "react";
import { StatusBar } from "react-native"
import { Sentry } from "react-native-sentry";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store";
import AppNavigator from "./navigators/app-navigator";

import "intl";
import "intl/locale-data/jsonp/en";

Sentry.config("https://c5c6fad7bce3480fa962382c9a01ee1e@sentry.io/1427686").install();

StatusBar.setBarStyle("light-content", true);

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);
