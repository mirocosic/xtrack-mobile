import React, { Component } from "react"
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native"

import styles from "./styles"

export default class CustomKeyboard extends Component {

  state = {
    calculationMode: false,
    input: ""
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
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("1")}>
                <Text style={styles.copy}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("2")}>
                <Text style={styles.copy}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("3")}>
                <Text style={styles.copy}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("4")}>
                <Text style={styles.copy}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("5")}>
                <Text style={styles.copy}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("6")}>
                <Text style={styles.copy}>6</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("7")}>
                <Text style={styles.copy}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("8")}>
                <Text style={styles.copy}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.digit} onPress={() => this.handlePress("9")}>
                <Text style={styles.copy}>9</Text>
              </TouchableOpacity>
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
