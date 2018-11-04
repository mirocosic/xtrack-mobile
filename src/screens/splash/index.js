import React, {Component} from "react";
import {View, Text, Button } from "react-native";

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"

export default class Splash extends Component {

  render(){
    return(
      <Screen>
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Text>Splash</Text>
        </View>
      </Screen>
    )
  }
}
