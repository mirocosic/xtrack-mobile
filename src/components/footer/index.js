import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { DarkModeContext } from "react-native-dark-mode"

import styles from "./styles"

class Footer extends Component {
  static contextType = DarkModeContext

  state = {}

  render() {
    const { backBtn, backBtnPress, style, children, navigation } = this.props
    const darkMode = this.context === "dark"

    return (
      <View style={[styles.container, style, darkMode && styles.containerDark]}>
        {backBtn && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              backBtnPress ? backBtnPress() : navigation.goBack()
            }}>
            <Text>{"< Back"}</Text>
          </TouchableOpacity>
        )}
        {children}
      </View>
    )
  }
}

export default Footer
