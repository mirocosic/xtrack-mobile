import { createBottomTabNavigator } from "react-navigation";
import { Dashboard, Overview, Reports, Profile, Transactions } from "../screens";
import palette from "../utils/palette";

const BottomBarNavigator = createBottomTabNavigator({
  Dashboard: { screen: Dashboard },
  Overview: { screen: Overview },
  Transactions: { screen: Transactions },
  Reports: { screen: Reports },
  Profile: { screen: Profile },
}, {
  tabBarPosition: "bottom",
  lazy: false,
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: "teal",
    inactiveTintColor: palette.black,
    showIcon: true,
    upperCaseLabel: false,
    indicatorStyle: { backgroundColor: palette.secondary },
    style: {
      justifyContent: "space-around",
      backgroundColor: "#ffffff",
      height: 65,
      paddingBottom: 5,
    },
  },
});

export default BottomBarNavigator;
