import React from "react"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useDarkMode } from "react-native-dark-mode"
import { Host } from "react-native-portalize"

import BottomBarNavigator from "./bottom-bar-navigator"
import {
  TransactionForm, Dashboard, Settings, Categories, Accounts, Labels,
  CategoryEdit, Splash, Overview, AccountEdit, LabelEdit, Backup,
} from "../screens"

const Stack = createStackNavigator()

export default () => (
  <NavigationContainer theme={useDarkMode() ? DarkTheme : DefaultTheme}>
    <Host>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={BottomBarNavigator} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CategoryEdit" component={CategoryEdit} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="AccountEdit" component={AccountEdit} />
        <Stack.Screen name="TransactionForm" component={TransactionForm} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Labels" component={Labels} />
        <Stack.Screen name="LabelEdit" component={LabelEdit} />
        <Stack.Screen name="Backup" component={Backup} />
      </Stack.Navigator>
    </Host>
  </NavigationContainer>
)
