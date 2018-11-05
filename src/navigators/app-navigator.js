import { createStackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

import BottomBarNavigator from './bottom-bar-navigator';
import { EntryForm, Dashboard, Profile, Categories, Splash } from "../screens"

const AppStack = createStackNavigator({
  Splash: { screen: Splash },
  Main: { screen: BottomBarNavigator },
  Dashboard: { screen: Dashboard },
  Categories: { screen: Categories},
  EntryForm: { screen: EntryForm },
  Profile: { screen: Profile }

},{
  headerMode: "none",
  initialRouteName: 'Splash',
});

export default AppStack;

// export default SwitchNavigator({
//   App: AppStack
//});
