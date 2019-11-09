import React, { Component } from "react"
import { Alert, View, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";
import { Screen, Header, Footer } from "../../components"
import { Copy } from "../../components/typography"

class Backup extends Component {

  state = {}

  createBackup = () => {
    Alert.alert("Create backup", "Do you want to create a new backup?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => {} },
    ])
  }

  render() {
    return (
      <Screen>
        <Header title="Backup / Restore" backBtn />
        <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
          <Copy>Previous backups</Copy>
        </View>

        <Footer>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.createBackup()}>
              <Copy style={{ color: "teal" }}>Create new backup</Copy>
            </TouchableOpacity>
          </View>
        </Footer>
      </Screen>
    )
  }
}

export default withNavigation(Backup);
