import { createStackNavigator } from "react-navigation";

import BottomBarNavigator from "./bottom-bar-navigator";
import {
  TransactionForm, Dashboard, Profile, Categories, Accounts, Labels,
  CategoryEdit, Splash, Overview, AccountEdit, LabelEdit, Backup,
} from "../screens"

const AppStack = createStackNavigator({
  Splash: { screen: Splash },
  Main: { screen: BottomBarNavigator },
  Dashboard: { screen: Dashboard },
  Overview: { screen: Overview },
  Categories: { screen: Categories },
  CategoryEdit: { screen: CategoryEdit },
  Accounts: { screen: Accounts },
  AccountEdit: { screen: AccountEdit },
  TransactionForm: { screen: TransactionForm },
  Profile: { screen: Profile },
  Labels: { screen: Labels },
  LabelEdit: { screen: LabelEdit },
  Backup: { screen: Backup },

}, {
  headerMode: "none",
  initialRouteName: "Main",
});

export default AppStack;
