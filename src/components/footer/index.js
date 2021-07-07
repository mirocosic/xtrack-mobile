import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useTheme } from "../../utils/ui-utils"
import styles from "./styles"

export default ({ backBtn, backBtnPress, style, children, navigation }) => (
  <View style={[styles.container, style, (useTheme() === "dark") && styles.containerDark]}>
    {backBtn && (
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          backBtnPress ? backBtnPress() : navigation.goBack()
        }}>
        <Text>{"< Back"}</Text>
      </TouchableOpacity>
    )}
    {children}
  </View>
)