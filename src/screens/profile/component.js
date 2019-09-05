import React, { Component } from "react";
import { View, Switch, Alert, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import Icon from "../../components/icon"
import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy } from "../../components/typography"
import __ from "../../utils/translations"
import styles from "./styles"

class Profile extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="cog" />
    ),
  })

  selectLanguage = () => {
    Alert.alert(
      __("Select language"),
      __("Please choose your preferred language"),
      [
        { text: "English", onPress: () => this.props.setLanguage({ code: "eng", name: "English" }) },
        { text: "Hrvatski", onPress: () => this.props.setLanguage({ code: "hrv", name: "Hrvatski" }) },
      ],
    )
  }

  render() {
    const {
      navigation, darkMode, toggleDarkMode, language, erase, locationTracking,
      handleLocationTracking, openOnForm, toggleOpenOnForm,
    } = this.props

    return (
      <Screen>
        <Header title="Settings" />

        <TouchableOpacity
          onPress={() => navigation.navigate("Categories")}
          style={styles.settingWrap}>
          <View>
            <Copy>Categories</Copy>
            <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              Customize categories to group your transactions
            </Copy>
          </View>

          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Accounts")}
          style={styles.settingWrap}>
          <View>
            <Copy>Accounts</Copy>
            <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              Create separate accounts for your transactions
            </Copy>
          </View>
          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Labels")}
          style={styles.settingWrap}
        >
          <View>
            <Copy>Labels</Copy>
            <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              Tag your transactions with labels for easy tracking
            </Copy>
          </View>
          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <View style={{ padding: 20 }}>

          {
          // <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          //   <Copy>Dark mode</Copy>
          //   <Switch value={darkMode} onValueChange={toggleDarkMode} />
          // </View>
          }

          <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Copy>Enable Location Tracking</Copy>
            <Switch value={locationTracking} onValueChange={this.handleLocationTracking} />
          </View>

          <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Copy>Open app on transaction form</Copy>
            <Switch value={openOnForm} onValueChange={toggleOpenOnForm} />
          </View>

          {
          // <TouchableOpacity
          //   onPress={this.selectLanguage}
          //   style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
          //   <Copy>{`${__("Language")}:`}</Copy>
          //   <Copy style={{ color: "blue" }}>{language.name}</Copy>
          // </TouchableOpacity>
          }

        </View>
      </Screen>
    )
  }
}

export default withNavigation(Profile);
