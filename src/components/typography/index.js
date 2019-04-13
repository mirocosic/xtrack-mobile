import React from "react"
import { Text, StyleSheet } from "react-native"

import { connect } from "react-redux";
import palette from "../../utils/palette"

const CopyCmp = (props) => {
  const defaultStyle = props.darkMode ? styles.copyDark : styles.copy
  return (
    <Text style={{ ...defaultStyle, ...props.style }}>{props.children}</Text>
  )
}

const TitleCmp = (props) => {
  const defaultStyle = props.darkMode ? styles.titleDark : styles.title
  return (
    <Text style={{ ...defaultStyle, ...props.style }}>{props.children}</Text>
  )
}

export const Copy = connect(
  state => ({ darkMode: state.common.darkMode }),
  null,
)(CopyCmp)

export const Title = connect(
  state => ({ darkMode: state.common.darkMode }),
  null,
)(TitleCmp)

const styles = StyleSheet.create({
  copy: {
    color: palette.black,
    fontSize: 16,
  },

  copyDark: {
    color: palette.white,
    fontSize: 16,
  },

  title: {
    fontSize: 24,
    padding: 10,
    color: palette.black,
  },

  titleDark: {
    fontSize: 24,
    padding: 10,
    color: palette.white,
  },

})
