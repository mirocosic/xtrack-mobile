import React, { Component } from "react"
import { View, Switch, Alert, TouchableOpacity } from "react-native"

import Icon from "../../components/icon"
import Screen from "../../components/screen"
import { Copy } from "../../components/typography"
import __ from "../../utils/translations"
import styles from "./styles"

class Settings extends Component {

  selectLanguage = () => {
    const { setLanguage } = this.props
    Alert.alert(
      __("Select language"),
      __("Please choose your preferred language"),
      [
        { text: "English", onPress: () => setLanguage({ code: "eng", name: "English" }) },
        { text: "Hrvatski", onPress: () => setLanguage({ code: "hrv", name: "Hrvatski" }) },
      ],
    )
  }

  render() {
    const { navigation, locationTracking, openOnForm, toggleOpenOnForm, language } = this.props

    return (
      <Screen style={{ paddingTop: 20 }}>

        <View style={styles.settingWrap} />

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
            <Copy>Tags</Copy>
            <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              Tag your transactions with labels for easy tracking
            </Copy>
          </View>
          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Backup")}
          style={styles.settingWrap}
        >
          <View style={{ maxWidth: 300 }}>
            <Copy>Backup/Restore</Copy>
            <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              Make a local backup of your data and restore it if you delete the app.
            </Copy>
          </View>
          <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
        </TouchableOpacity>

        <View style={{ padding: 20 }}>

          <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Copy>Enable Location Tracking</Copy>
            <Switch value={locationTracking} onValueChange={this.handleLocationTracking} />
          </View>

          <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Copy>Open app on transaction form</Copy>
            <Switch value={openOnForm} onValueChange={toggleOpenOnForm} />
          </View>

          <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Copy>Language</Copy>
            <TouchableOpacity onPress={this.selectLanguage}>
              <Copy>{language.name}</Copy>
            </TouchableOpacity>
          </View>


        </View>

        <Copy style={{ textAlign: "center" }}>App version: 1.0.1 (29)</Copy>
      </Screen>
    )
  }
}

export default Settings
