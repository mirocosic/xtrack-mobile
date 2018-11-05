import React, {Component} from "react";
import {View, Text, Button, Switch, Alert, TouchableOpacity, StatusBar } from "react-native";

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"

class Profile extends Component {

  selectLanguage =  () => {
    Alert.alert(
      __("Select language"),
      __("Please choose your preferred language"),
      [
        {text: "English", onPress: ()=>this.props.setLanguage({code:"eng", name: "English"})},
        {text: "Hrvatski", onPress: ()=> this.props.setLanguage({code: "hrv", name: "Hrvatski"})}
      ]
    )
  }

  render(){
    return(
      <Screen>
        <Title style={{alignSelf: "center"}}>Profile</Title>
        <View style={{paddingTop: 20}}>
          <Copy>Miro</Copy>
          <Copy>Wuk</Copy>
          <View style={{marginTop: 20}}>
            <Copy>Settings</Copy>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <Copy>Dark mode</Copy>
              <Switch value={this.props.darkMode} onValueChange={()=>{
                  if (this.props.darkMode) {
                    StatusBar.setBarStyle("dark-content");
                  } else {
                    StatusBar.setBarStyle("light-content")
                  }

                  this.props.toggleDarkMode()
                }}/>
            </View>

            <TouchableOpacity
              onPress={this.selectLanguage}
              style={{flexDirection: "row"}}>
              <Copy>{__("Language") + ": "}</Copy>
              <Copy>{this.props.language.name}</Copy>
            </TouchableOpacity>

            <Button title="ERASE DATA" onPress={this.props.erase}/>


          </View>
        </View>
      </Screen>
    )
  }
}

export default withNavigation(Profile);
