import React, {Component} from "react";
import {View, Text, Button, Switch, Alert, TouchableOpacity, StatusBar, StyleSheet } from "react-native";

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"

class Profile extends Component {

  handleDarkMode = () => {
    if (this.props.darkMode) {
      StatusBar.setBarStyle("dark-content");
    } else {
      StatusBar.setBarStyle("light-content")
    }

    this.props.toggleDarkMode()
  }

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
        <Header title="Profile"></Header>

        <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
          <Copy>Miro</Copy>
          <Copy>Wuk</Copy>

          <View style={{marginTop: 20}}>
            <Title>Settings</Title>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <Copy>Dark mode</Copy>
              <Switch value={this.props.darkMode} onValueChange={this.handleDarkMode}/>
            </View>

            <TouchableOpacity
              onPress={this.selectLanguage}
              style={{flexDirection: "row"}}>
              <Copy>{__("Language") + ": "}</Copy>
              <Copy>{this.props.language.name}</Copy>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Categories")}
              style={styles.settingWrap}>
              <Copy>Categories</Copy>
              <Title>></Title>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Accounts")}
              style={styles.settingWrap}>
              <Copy>Accounts</Copy>
              <Title>></Title>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Labels")}
              style={styles.settingWrap}>
              <Copy>Labels</Copy>
              <Title>></Title>
            </TouchableOpacity>

            <Button title="ERASE DATA" onPress={this.props.erase}/>

          </View>
        </View>
      </Screen>
    )
  }
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
  settingWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderWidth: 1
  }
})
