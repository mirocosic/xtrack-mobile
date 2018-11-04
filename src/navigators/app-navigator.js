import { createStackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

import BottomBarNavigator from './bottom-bar-navigator';
import { EntryForm, Dashboard, Profile, Categories } from "../screens"

const AppStack = createStackNavigator({
  //Main: { screen: BottomBarNavigator },
  Dashboard: { screen: Dashboard },
  Categories: { screen: Categories},
  EntryForm: { screen: EntryForm },

},{
  headerMode: "none",
  initialRouteName: 'Main',
});

export default AppStack;

// export default SwitchNavigator({
//   App: AppStack
//});
