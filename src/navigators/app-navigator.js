import React from "react"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import { useDarkMode } from "react-native-dark-mode"
import { Host } from "react-native-portalize"

import BottomBarNavigator from "./bottom-bar-navigator"
import {
  TransactionForm, Dashboard, Settings, Categories, Accounts, Labels,
  CategoryEdit, Splash, Overview, AccountEdit, LabelEdit, Backup,
} from "../screens"

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

const MainStackScreen = () => (
  <MainStack.Navigator initialRouteName="Main" headerMode="none">
    <MainStack.Screen name="Main" component={BottomBarNavigator} />
    <MainStack.Screen name="Splash" component={Splash} />
    <MainStack.Screen name="Dashboard" component={Dashboard} />
    <MainStack.Screen name="Overview" component={Overview} />
    <MainStack.Screen name="Categories" component={Categories} />
    <MainStack.Screen name="Accounts" component={Accounts} />
    <MainStack.Screen name="Settings" component={Settings} />
    <MainStack.Screen name="Labels" component={Labels} />
    <MainStack.Screen name="Backup" component={Backup} />
  </MainStack.Navigator>
)

export default () => (
  <NavigationContainer theme={useDarkMode() ? DarkTheme : DefaultTheme}>
    <Host>
      <RootStack.Navigator initialRouteName="App" headerMode="none" mode="modal">
        <RootStack.Screen name="App" component={MainStackScreen} />

        <MainStack.Screen name="CategoryEdit" component={CategoryEdit} />
        <MainStack.Screen name="AccountEdit" component={AccountEdit} />
        <MainStack.Screen name="LabelEdit" component={LabelEdit} />

        <RootStack.Screen
          name="TransactionForm"
          component={TransactionForm}
          options={{
            title: "Profile",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }} />
      </RootStack.Navigator>
    </Host>
  </NavigationContainer>
)
