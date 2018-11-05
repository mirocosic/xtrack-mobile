import React, {Component} from "react";
import {View, Text, Button } from "react-native";

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"

import translate from "../../utils/translations"

class Splash extends Component {

  render(){
    console.log("miro")
    return(
      <Screen>
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
          <Title style={{fontSize: 24}}>{translate("Welcome to XTrack!", "hrv")}</Title>
          <Copy style={{fontSize: 18, marginTop: 30}}>Probably the best expense tracking app...</Copy>
          <Copy style={{fontSize: 18, marginTop: 10, marginBottom: 40}}>...in the world!</Copy>
          <Button title={translate("Go to app", "hrv")} onPress={()=>this.props.navigation.navigate("Main")}/>
        </View>
      </Screen>
    )
  }
}

export default withNavigation(Splash);
