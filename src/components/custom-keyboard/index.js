import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { RectButton } from "react-native-gesture-handler"

import palette from "../../utils/palette"
import Digit from "../digit"
import styles from "./styles"
import { Copy } from "../typography"
import { useDarkTheme } from "../../utils/ui-utils"

export default ({handlePress, setAmount, handleSubmit, del}) => {

  const [input, setInput] = useState("")
  const [calculationMode, setCalculationMode] = useState(false)

  const onPress = (digit) => {
    if (!calculationMode) { handlePress(digit) }
    setInput(input + digit)
  }

  const handleOperation = (operation) => {
    setInput(`${input}${operation}`)
    setCalculationMode(true)
  }

  const handleClear = () => {
    setInput("")
    setAmount("0")
  }

  const calculate = () => {
    setInput(input ? `${input} = ${eval(input)}` : "")
    setCalculationMode(false)
    setAmount(input ? eval(input).toString() : "0")
  }

  const handleDel = () => {
    setInput(input.substring(0, input.length - 1))
    !calculationMode && del()
  }

  return (
    <View style={[styles.wrap, useDarkTheme() && styles.wrapDark]}>
        <View style={{ alignItems: "flex-end", padding: 5 }}>
          <Copy>{input}</Copy>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <Digit digit="1" handlePress={() => onPress("1")} />
              <Digit digit="2" handlePress={() => onPress("2")} />
              <Digit digit="3" handlePress={() => onPress("3")} />
            </View>

            <View style={styles.row}>
              <Digit digit="4" handlePress={() => onPress("4")} />
              <Digit digit="5" handlePress={() => onPress("5")} />
              <Digit digit="6" handlePress={() => onPress("6")} />
            </View>

            <View style={styles.row}>
              <Digit digit="7" handlePress={() => onPress("7")} />
              <Digit digit="8" handlePress={() => onPress("8")} />
              <Digit digit="9" handlePress={() => onPress("9")} />
            </View>

            <View style={styles.row}>
              <Digit digit="," handlePress={() => onPress(".")} />
              <Digit digit="0" handlePress={() => onPress("0")} />
              <Digit digit="" handlePress={() => {}} />
            </View>
          </View>

          <View>
            <Digit digit="+" handlePress={() => handleOperation("+")} small />
            <Digit digit="-" handlePress={() => handleOperation("-")} small />
            <Digit digit="x" handlePress={() => handleOperation("*")} small />
            <Digit digit="/" handlePress={() => handleOperation("/")} small />
          </View>

          <View>
            <Digit digit="C" handlePress={() => handleClear()} small />
            <Digit digit="DEL" handlePress={() => handleDel()} small />

            <RectButton
              style={[styles.digit, !calculationMode && { backgroundColor: palette.blue }]}
              onPress={() => (calculationMode ? calculate() : handleSubmit())}>
              <Text style={{ color: !calculationMode ? "white" : "black" }}>{calculationMode ? "=" : "OK"}</Text>
            </RectButton>
          </View>
        </View>
      </View>
  )
}
