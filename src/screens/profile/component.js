import React, { Component } from "react";
import { Animated, View, Button, Switch, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Sentry } from "react-native-sentry";
import { withNavigation } from "react-navigation";

import Icon from "../../components/icon"
import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import styles from "./styles"

class Profile extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="cog" />
      )
    }
  }

  handleClick = () => {
    let x = 120;
    let y = 30;
    let move = 0;
    if (this.state.closed) {
      x = 200;
      y = 150;
      move = 100;
    }

    Animated.parallel([
      Animated.timing(
        this.state.scaleX,
        {
          toValue: x,
          duration: 500,
        }
      ),
      Animated.timing(
        this.state.scaleY,
        {
          toValue: y,
          duration: 500,
        }
      ),
      Animated.timing(
        this.state.move,
        {
          toValue: move,
          duration: 500,
        }
      )
    ]).start()


    this.setState({
      closed: !this.state.closed
    })
  }


  handleDarkMode = () => {
    if (this.props.darkMode) {
    //  StatusBar.setBarStyle("dark-content");
    } else {
    //  StatusBar.setBarStyle("light-content")
    }

    this.props.toggleDarkMode()
  }

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
    const { navigation, darkMode, language, erase } = this.props
    return (
      <Screen>
        <Header title="Settings" />

        <TouchableOpacity
          onPress={() => navigation.navigate("Categories")}
          style={styles.settingWrap}
        >
          <Copy>Categories</Copy>
          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Accounts")}
          style={styles.settingWrap}
        >
          <Copy>Accounts</Copy>
          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Labels")}
          style={styles.settingWrap}
        >
          <Copy>Labels</Copy>
          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <View style={{ padding: 20 }}>

          <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Copy>Dark mode</Copy>
            <Switch value={darkMode} onValueChange={this.handleDarkMode} />
          </View>

          <TouchableOpacity
            onPress={this.selectLanguage}
            style={{ flexDirection: "row" }}
          >
            <Copy>{__("Language") + ": "}</Copy>
            <Copy>{language.name}</Copy>
          </TouchableOpacity>

          <View style={{ paddingTop: 20 }}>
            <Button title="ERASE DATA" onPress={erase} />
            <Button title="Sentry exception" onPress={() => Sentry.captureMessage("Test message")} />
          </View>

        </View>
      </Screen>
    )
  }
}

export default withNavigation(Profile);
