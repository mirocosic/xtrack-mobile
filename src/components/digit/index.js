import React, { Component, useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { useDarkTheme } from "../../utils/ui-utils"
import styles from "./styles"

export default ({handlePress, small, digit}) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <TouchableOpacity
        underlayColor="teal"
        activeOpacity={0.6}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onShowUnderlay={() => setIsPressed(true)}
        onHideUnderlay={() => setIsPressed(false)}
        style={[
          styles.digit,
          useDarkTheme() && styles.digitDark,
          isPressed && styles.pressedDigit,
        ]}
        onPress={() => handlePress(digit)}>
        <Text
          style={[
            small ? styles.copySmall : styles.copy,
            useDarkTheme() && styles.copyDark,
            isPressed && styles.pressedCopy,
          ]}>
          {digit}
        </Text>
      </TouchableOpacity>
  )
}