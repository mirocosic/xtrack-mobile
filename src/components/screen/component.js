import React from "react"
import PropTypes from "prop-types"
import { View } from "react-native"
import styles from "./styles"

const Screen = ({ style, darkMode, children }) => (
  <View style={[styles.container, style, darkMode && styles.containerDark]}>
    { children }
  </View>
)

Screen.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
}

export default Screen;
