import React, { Component } from "react"
import { Text, TouchableOpacity } from "react-native"
import styles from "./styles"

export default class Digit extends Component {

  state = { pressed: false }

  render() {
    const { pressed } = this.state
    const { small, handlePress, digit } = this.props
    return (
      <TouchableOpacity
        underlayColor="teal"
        activeOpacity={0.6}
        onPressIn={() => this.setState({ pressed: true })}
        onPressOut={() => this.setState({ pressed: false })}
        onShowUnderlay={() => this.setState({ pressed: true })}
        onHideUnderlay={() => this.setState({ pressed: false })}
        style={pressed ? styles.pressedDigit : styles.digit}
        onPress={() => handlePress(digit)}
      >
        {
          small
            ? <Text style={pressed ? styles.pressedCopySmall : styles.copySmall}>{digit}</Text>
            : <Text style={pressed ? styles.pressedCopy : styles.copy}>{digit}</Text>
        }

      </TouchableOpacity>
    )
  }
}
