import React from "react"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Host } from "react-native-portalize"

import BottomBarNavigator from "./bottom-bar-navigator"
import {
  TransactionForm,
  Dashboard,
  Settings,
  Categories,
  Accounts,
  Labels,
  CategoryEdit,
  Splash,
  Overview,
  AccountEdit,
  LabelEdit,
  Backup,
  Onboarding,
} from "../screens"
import DrawerContent from "../components/drawer"
import { useDarkTheme } from "../utils/ui-utils"
import { isIos } from "../utils/os-utils"

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()
const Drawer = createDrawerNavigator()

const MainStackScreen = () => (
  <MainStack.Navigator initialRouteName="Splash" headerMode="none">
    <MainStack.Screen name="Main" component={BottomBarNavigator} options={{gestureEnabled: false}} />
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

const transitionPreset = isIos ? TransitionPresets.ModalPresentationIOS : TransitionPresets.ScaleFromCenterAndroid

const Main = () => (
  <Host>
    <RootStack.Navigator
      initialRouteName="App"
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardOverlayEnabled: true,
        ...transitionPreset
      }}
      >
      <RootStack.Screen name="App" component={MainStackScreen} />
      <RootStack.Screen name="TransactionForm" component={TransactionForm} />

      <MainStack.Screen name="CategoryEdit" component={CategoryEdit} />
      <MainStack.Screen name="AccountEdit" component={AccountEdit} />
      <MainStack.Screen name="LabelEdit" component={LabelEdit} />
    </RootStack.Navigator>
  </Host>
)

export default () => (
  <NavigationContainer theme={useDarkTheme() ? DarkTheme : DefaultTheme}>
    <Drawer.Navigator
      openByDefault={true}
      screenOptions={{
        drawerPosition: "right",
        drawerType: "front",
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: true,
      }}
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}>
      <Drawer.Screen name="Main" component={Main} />
    </Drawer.Navigator>
  </NavigationContainer>
)
