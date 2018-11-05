import React from 'react';
import { TabNavigator, DrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { Dashboard, EntryForm, Profile, Splash, Categories, Accounts } from '../screens';
import palette from '../utils/palette';
//import { primaryFont } from '../lib/fonts';
//import { isIos } from '../lib/os-utils';

import TabBarComponent from "./tab-bar-component";

const iosStyle = {
  justifyContent: 'space-around',
  backgroundColor: '#ffffff',
  height: 65,
  paddingBottom: 5
}

const androidStyle = {
  backgroundColor: '#ffffff',
  height: 65,
}

const iosIconStyle = {
  marginTop: 10
}

const androidIconStyle = {
  height: 35,
  width: 60
}

const iosLabelStyle = {
  //fontFamily: primaryFont,
  marginTop: -10,
  fontSize: 13
}

const androidLabelStyle = {
  //fontFamily: primaryFont,
  fontSize: 13,
  minWidth: 80,
  marginTop: -3
}

const BottomBarNavigator = createBottomTabNavigator({
  Dashboard: { screen: Dashboard },
  EntryForm: { screen: EntryForm},
  Profile: { screen: Profile},
  Categories: { screen: Categories},
  Accounts: { screen: Accounts}
},{
  //initialRouteName: "Profile",
  tabBarPosition: 'bottom',
  lazy: false,
  swipeEnabled: true,
  animationEnabled: true,
  //tabBarComponent: TabBarBottom,
  tabBarOptions: {
    activeTintColor: palette.secondary,
    inactiveTintColor: palette.black,
    showIcon: true,
    upperCaseLabel: false,

    //labelStyle: isIos ? iosLabelStyle : androidLabelStyle,

    //iconStyle: isIos ? iosIconStyle : androidIconStyle,

    indicatorStyle: {
      backgroundColor: palette.secondary
    },

    style: {
      justifyContent: 'space-around',
      backgroundColor: '#ffffff',
      height: 65,
      paddingBottom: 5
    }

    //style: isIos ? iosStyle : androidStyle
  }
});

export default BottomBarNavigator;
