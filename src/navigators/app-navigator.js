import React from "react"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useDarkMode } from "react-native-dark-mode"
import { Host } from "react-native-portalize"

import BottomBarNavigator from "./bottom-bar-navigator"
import {
  TransactionForm, Dashboard, Settings, Categories, Accounts, Labels,
  CategoryEdit, Splash, Overview, AccountEdit, LabelEdit, Backup, Onboarding,
} from "../screens"
import DrawerContent from "../components/drawer"

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()
const Drawer = createDrawerNavigator()

const MainStackScreen =  () => (
    <MainStack.Navigator initialRouteName="Splash" headerMode="none">
    <MainStack.Screen name="Main" component={BottomBarNavigator} />
    <MainStack.Screen name="Splash" component={Splash} />
    <MainStack.Screen name="Onboarding" component={Onboarding} />
    <MainStack.Screen name="Dashboard" component={Dashboard} />
    <MainStack.Screen name="Overview" component={Overview} />
    <MainStack.Screen name="Categories" component={Categories} />
    <MainStack.Screen name="Accounts" component={Accounts} />
    <MainStack.Screen name="Settings" component={Settings} />
    <MainStack.Screen name="Labels" component={Labels} />
    <MainStack.Screen name="Backup" component={Backup} />
  </MainStack.Navigator>
)

const Main = () => (
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
)

export default () => (
  <NavigationContainer theme={useDarkMode() ? DarkTheme : DefaultTheme}>
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}>
      <Drawer.Screen
        name="Drawer"
        component={Main} />
    </Drawer.Navigator>
  </NavigationContainer>
)
