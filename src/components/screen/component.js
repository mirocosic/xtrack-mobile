import React from "react"
import { View } from "react-native"
import { useDarkTheme } from "../../utils/ui-utils"
import styles from "./styles"

const Screen = ({ style, children }) => (
  <View
    style={[styles.container, style, useDarkTheme() && styles.containerDark]}>
    {children}
  </View>
)

export default Screen
