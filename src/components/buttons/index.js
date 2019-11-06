import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Copy } from "../typography"
import palette from "../../utils/palette"
import styles from "./styles"

export const PrimaryButton = (props) => {
  const { label, onPress, style } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[{ backgroundColor: palette.blue, ...styles.wrap }, style]}>
        <Copy style={styles.label}>{label}</Copy>
      </View>
    </TouchableOpacity>
  )
}

export const SecondaryButton = (props) => {
  const { label, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor: "gray", ...styles.wrap }}>
        <Copy style={styles.label}>{label}</Copy>
      </View>
    </TouchableOpacity>
  )
}
