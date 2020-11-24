import React from "react"
import { View } from "react-native"
import ReactNativeHapticFeedback from "react-native-haptic-feedback"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useDarkMode } from "react-native-dark-mode"
import { RectButton } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"

import { Dashboard, Overview, Settings, Transactions } from "../screens"
import Icon from "../components/icon"
import palette from "../utils/palette"
import { font } from "../components/typography"
import { safePaddingBottom } from "../utils/ui-utils"
import __ from "../utils/translations"

const AddRedirector = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      ReactNativeHapticFeedback.trigger("impactLight");
      e.preventDefault()
      navigation.navigate("TransactionForm", { clearForm: true })
    });

    return unsubscribe
  }, [navigation])

  return null
}

const Tab = createBottomTabNavigator()

export default () => (
  <Tab.Navigator
    lazy={false}
    tabBarOptions={{
      activeTintColor: "#2059f4",
      inactiveTintColor: useDarkMode() ? palette.white : palette.black,
      showIcon: true,
      upperCaseLabel: false,
      indicatorStyle: { backgroundColor: palette.secondary, fontFamily: font },
      style: {
        justifyContent: "space-around",
        backgroundColor: useDarkMode() ? palette.darkGray : "#ffffff",
        height: 65 + safePaddingBottom(),
        paddingBottom: safePaddingBottom(),
      },
    }}
  >
    <Tab.Screen
      name={__("Dashboard")}
      component={Dashboard}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon style={{ backgroundColor: useDarkMode() ? palette.darkGray : "white" }} textStyle={{ fontSize: 26, color }} type="tasks" />
        ),
      }}
    />
    <Tab.Screen
      name={__("Overview")}
      component={Overview}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon style={{ backgroundColor: useDarkMode() ? palette.darkGray : "white" }} textStyle={{ fontSize: 26, color }} type="tachometer-alt" />
        ),
      }}
    />
    <Tab.Screen
      name={__("Add")}
      component={AddRedirector}
      options={{
        tabBarIcon: () => (
          <RectButton
            activeOpacity={0.5}
            style={{
              marginBottom: 20,
              width: 60,
              height: 60,
              marginTop: -20,
              alignItems: "center",
              borderRadius: 40
            }}>

            <LinearGradient
              colors={["#2292f4", "#2031f4"]}
              style={[{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }]}>
              <Icon
                textStyle={{ fontSize: 30, color: "white" }}
                type="plus" />
            </LinearGradient>
          </RectButton>
        ),
      }}
    />
    <Tab.Screen
      name={__("Transactions")}
      component={Transactions}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon style={{ backgroundColor: useDarkMode() ? palette.darkGray : "white" }} textStyle={{ fontSize: 26, color }} type="exchangeAlt" />
        ),
      }} />
    <Tab.Screen
      name={__("Settings")}
      component={Settings}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon style={{ backgroundColor: useDarkMode() ? palette.darkGray : "white" }} textStyle={{ fontSize: 26, color }} type="cog" />
        ),
      }} />

  </Tab.Navigator>
)
