import { createStackNavigator } from "react-navigation";

import BottomBarNavigator from "./bottom-bar-navigator";
import {
  TransactionForm, Dashboard, Profile, Categories, Accounts, Labels,
  CategoryEdit, Splash,
} from "../screens"

const AppStack = createStackNavigator({
  Splash: { screen: Splash },
  Main: { screen: BottomBarNavigator },
  Dashboard: { screen: Dashboard },
  Categories: { screen: Categories },
  CategoryEdit: { screen: CategoryEdit },
  Accounts: { screen: Accounts },
  TransactionForm: { screen: TransactionForm },
  Profile: { screen: Profile },
  Labels: { screen: Labels },

}, {
  headerMode: "none",
  initialRouteName: "Main",
});

export default AppStack;
