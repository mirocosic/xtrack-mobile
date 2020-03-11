import React from "react"
import PropTypes from "prop-types"
import { View } from "react-native"
import { useDarkMode } from "react-native-dark-mode"
import styles from "./styles"


const Screen = ({ style, children }) => (
  <View style={[styles.container, style, useDarkMode() && styles.containerDark]}>
    { children }
  </View>
)

Screen.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
}

export default Screen;
