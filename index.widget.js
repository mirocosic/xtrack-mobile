/** @format */
import React, { Component } from "react"
import { View, Text } from "react-native"

import {AppRegistry} from 'react-native';
//import App from './src/App';

class Widget extends Component {
  render(){
    return(
      <View>
        <Text>Hello ME!</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent("XTrackWidget", () => Widget);
