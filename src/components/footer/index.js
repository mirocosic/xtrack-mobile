import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import styles from "./styles"

class Footer extends Component {

  state = {}

  render() {
    const { backBtn, backBtnPress, style, children, navigation } = this.props
    return (
      <View style={[styles.container, style]}>
        { backBtn && (
          <TouchableOpacity style={styles.backBtn} onPress={() => { backBtnPress ? backBtnPress() : navigation.goBack() }}>
            <Text>{"< Back"}</Text>
          </TouchableOpacity>
        )}
        {children}
      </View>
    )
  }
}

export default withNavigation(Footer)
