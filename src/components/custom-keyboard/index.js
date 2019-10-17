import React, { Component } from "react"
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native"
import Digit from "../digit"
import styles from "./styles"

export default class CustomKeyboard extends Component {

  state = {
    calculationMode: false,
    input: "",
    pressed: false,
  }

  handlePress = (digit) => {

    if (!this.state.calculationMode) {
      this.props.handlePress(digit)
    }

    this.setState({ input: this.state.input + digit }, ()=>console.log(this.state.input))

  }

  handleOperation = (operation) => {
    this.setState({
      input: this.state.input + " " + operation + " ",
      calculationMode: true,
    })
  }

  handleClear = () => {
    this.setState({ input: "" })
    this.props.setAmount("0")
  }

  calculate = () => {
    this.setState({
      input: `${this.state.input} = ${eval(this.state.input)}`,
      calculationResult: eval(this.state.input),
      calculationMode: false,
    })
    this.props.setAmount(eval(this.state.input).toString())
  }

  render() {
    const { calculationMode } = this.state
    return (
      <View style={styles.wrap}>

        <View style={{ alignItems: "flex-end", padding: 5 }}>
          <Text>{ this.state.input}</Text>
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
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress(".")}>
                <Text style={styles.copy}>,</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("0")}>
                <Text style={styles.copy}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => {}}>
                <Text></Text>
              </TouchableOpacity>
            </View>

          </View>

          <View>
            <TouchableOpacity style={styles.digit} onPress={() => this.handleOperation("+")}>
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.digit} onPress={() => this.handleOperation("-")}>
              <Text>-</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.digit} onPress={() => this.handleOperation("*")}>
              <Text>*</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.digit} onPress={() => this.handleOperation("/")}>
              <Text>/</Text>
            </TouchableOpacity>

          </View>

          <View>
            <TouchableOpacity style={styles.digit} onPress={(() => this.handleClear())}>
              <Text>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.digit} onPress={(() => this.props.delete())}>
              <Text>DEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.digit, !calculationMode && { backgroundColor: "teal" }]}
              onPress={() => (calculationMode ? this.calculate() : this.props.handleSubmit())}>
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
