import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import palette from "../../utils/palette"

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.light,
    flex: 1,
  },

  containerDark: {
    backgroundColor: palette.dark,
  },

})

const Screen = ({ style, darkMode, children }) => (
  <View style={[styles.container, style, darkMode && styles.containerDark]}>
    { children }
  </View>
)

Screen.propTypes = {
  darkMode: PropTypes.bool.isRequired,
}

export default Screen;
