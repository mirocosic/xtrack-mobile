import React, { Component } from "react"
import { Text, TouchableOpacity } from "react-native"
import { DarkModeContext } from "react-native-dark-mode"

import styles from "./styles"

export default class Digit extends Component {
  static contextType = DarkModeContext

  state = { pressed: false }

  render() {
    const { pressed } = this.state
    const { small, handlePress, digit } = this.props
    const darkMode = this.context === "dark"
    return (
      <TouchableOpacity
        underlayColor="teal"
        activeOpacity={0.6}
        onPressIn={() => this.setState({ pressed: true })}
        onPressOut={() => this.setState({ pressed: false })}
        onShowUnderlay={() => this.setState({ pressed: true })}
        onHideUnderlay={() => this.setState({ pressed: false })}
        style={[
          styles.digit,
          darkMode && styles.digitDark,
          pressed && styles.pressedDigit,
        ]}
        onPress={() => handlePress(digit)}>
        <Text
          style={[
            small ? styles.copySmall : styles.copy,
            darkMode && styles.copyDark,
            pressed && styles.pressedCopy,
          ]}>
          {digit}
        </Text>
      </TouchableOpacity>
    )
  }
}
