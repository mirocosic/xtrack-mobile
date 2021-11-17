import React from "react"
import { View, TouchableOpacity } from "react-native"
import { RectButton, BorderlessButton } from "react-native-gesture-handler"
import { Copy } from "../typography"
import palette from "../../utils/palette"
import styles from "./styles"

export const PrimaryButton = props => {
  const { label, onPress, style } = props

  return (
    <RectButton
      onPress={onPress}
      style={[{ backgroundColor: palette.blue, ...styles.wrap }, style]}>
      <View>
        <Copy style={styles.label}>{label}</Copy>
      </View>
    </RectButton>
  )
}

export const SecondaryButton = props => {
  const { label, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor: "gray", ...styles.wrap }}>
        <Copy style={styles.label}>{label}</Copy>
      </View>
    </TouchableOpacity>
  )
}

export const TertiaryButton = props => {
  const { label, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.wrap }}>
        <Copy>{label}</Copy>
      </View>
    </TouchableOpacity>
  )
}
