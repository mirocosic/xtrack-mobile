import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import PropTypes from "prop-types"

import styles from "./styles"

const Footer = ({ backBtn, backBtnPress, style, icon, title, children, navigation }) => (
  <View style={[styles.container, style]}>
    { backBtn && (
      <TouchableOpacity style={styles.backBtn} onPress={()=>{ backBtnPress ? backBtnPress() : navigation.goBack() }}>
        <Text>{"< Back"}</Text>
      </TouchableOpacity>
    )}
    {children}
  </View>
)

export default withNavigation(Footer)
