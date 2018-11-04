import React, {Component} from "react";
import {View, Text, Button } from "react-native";

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"

class Profile extends Component {

  render(){
    return(
      <Screen>
        <Text>Profile</Text>
      </Screen>
    )
  }
}

export default withNavigation(Profile);
