import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { DarkModeContext } from "react-native-dark-mode"

import palette from "../../utils/palette"
import Digit from "../digit"
import styles from "./styles"

export default class CustomKeyboard extends Component {

  static contextType = DarkModeContext

  state = {
    calculationMode: false,
    input: "",
  }

  handlePress = (digit) => {
    const { calculationMode, input } = this.state
    const { handlePress } = this.props
    if (!calculationMode) {
      handlePress(digit)
    }

    this.setState({ input: input + digit })
  }

  handleOperation = (operation) => {
    const { input } = this.state
    this.setState({
      input: `${input} ${operation} `,
      calculationMode: true,
    })
  }

  handleClear = () => {
    this.setState({ input: "" })
    this.props.setAmount("0")
  }

  calculate = () => {
    const { input } = this.state
    this.setState({
      input: `${input} = ${eval(input)}`,
      calculationMode: false,
    })
    this.props.setAmount(eval(input).toString())
  }

  render() {
    const { calculationMode, input } = this.state
    const { handleSubmit } = this.props
    const darkMode = this.context === "dark"

    return (
      <View style={[styles.wrap, darkMode && styles.wrapDark]}>

        <View style={{ alignItems: "flex-end", padding: 5 }}>
          <Text>{input}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>

              <Digit digit="1" handlePress={() => this.handlePress("1")} />
              <Digit digit="2" handlePress={() => this.handlePress("2")} />
              <Digit digit="3" handlePress={() => this.handlePress("3")} />

            </View>

            <View style={styles.row}>
              <Digit digit="4" handlePress={() => this.handlePress("4")} />
              <Digit digit="5" handlePress={() => this.handlePress("5")} />
              <Digit digit="6" handlePress={() => this.handlePress("6")} />
            </View>

            <View style={styles.row}>
              <Digit digit="7" handlePress={() => this.handlePress("7")} />
              <Digit digit="8" handlePress={() => this.handlePress("8")} />
              <Digit digit="9" handlePress={() => this.handlePress("9")} />
            </View>

            <View style={styles.row}>
              <Digit digit="," handlePress={() => this.handlePress(".")} />
              <Digit digit="0" handlePress={() => this.handlePress("0")} />
              <Digit digit="" handlePress={() => {}} />
            </View>

          </View>

          <View>
            <Digit digit="+" handlePress={() => this.handleOperation("+")} small />
            <Digit digit="-" handlePress={() => this.handleOperation("-")} small />
            <Digit digit="x" handlePress={() => this.handleOperation("*")} small />
            <Digit digit="/" handlePress={() => this.handleOperation("/")} small />
          </View>

          <View>
            <Digit digit="C" handlePress={() => this.handleClear()} small />
            <Digit digit="DEL" handlePress={() => this.props.delete()} small />

            <TouchableOpacity
              style={[styles.digit, !calculationMode && { backgroundColor: palette.blue }]}
              onPress={() => (calculationMode ? this.calculate() : handleSubmit())}>
              <Text style={{ color: !calculationMode ? "white" : "black" }}>
                { calculationMode ? "=" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    )
  }
}
