import { createStackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

import BottomBarNavigator from './bottom-bar-navigator';
import { TransactionForm, Dashboard, Profile, Categories, Accounts, Labels, Splash } from "../screens"

const AppStack = createStackNavigator({
  Splash: { screen: Splash },
  Main: { screen: BottomBarNavigator },
  Dashboard: { screen: Dashboard },
  Categories: { screen: Categories},
  Accounts: { screen: Accounts},
  TransactionForm: { screen: TransactionForm },
  Profile: { screen: Profile },
  Labels: { screen: Labels },

},{
  headerMode: "none",
  initialRouteName: 'Splash',
});

export default AppStack;

// export default SwitchNavigator({
//   App: AppStack
//});
