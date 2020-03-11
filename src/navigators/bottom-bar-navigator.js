import { createBottomTabNavigator } from "react-navigation"
import { useDarkMode } from "react-native-dark-mode"

import { Dashboard, Overview, Reports, Profile, Transactions } from "../screens"
import palette from "../utils/palette"
import { font } from "../components/typography"

const BottomBarNavigator = createBottomTabNavigator({
  Dashboard: { screen: Dashboard },
  Overview: { screen: Overview },
  Add: { screen: Reports },
  Transactions: { screen: Transactions },
  Settings: { screen: Profile },
}, {
  tabBarPosition: "bottom",
  lazy: false,
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: palette.blue,
    inactiveTintColor: palette.black,
    showIcon: true,
    upperCaseLabel: false,
    indicatorStyle: { backgroundColor: palette.secondary, fontFamily: font },
    style: {
      justifyContent: "space-around",
      // backgroundColor: useDarkMode() ? "#000000" : "#ffffff",
      backgroundColor: "#ffffff",
      height: 65,
      paddingBottom: 5,
    },
  },
});

export default BottomBarNavigator;
