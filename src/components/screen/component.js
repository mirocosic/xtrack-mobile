import React from "react"
import { View } from "react-native"
import { useDarkMode } from "react-native-dark-mode"
import styles from "./styles"


const Screen = ({ style, children }) => (
  <View style={[styles.container, style, useDarkMode() && styles.containerDark]}>
    { children }
  </View>
)

export default Screen
