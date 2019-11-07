import React from "react"
import { Text, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { isIos } from "../../utils/os-utils"
import palette from "../../utils/palette"


export const font = "DIN 30640 Pro"

const CopyCmp = (props) => {
  const { darkMode, style, children } = props
  const defaultStyle = darkMode ? styles.copyDark : styles.copy
  return (
    <Text style={{ ...defaultStyle, ...style }}>{children}</Text>
  )
}

const CopyBlueCmp = (props) => {
  const { darkMode, style, children } = props
  const defaultStyle = darkMode ? styles.copyDark : styles.copyBlue
  return (
    <Text style={{ ...defaultStyle, ...style }}>{children}</Text>
  )
}

const TitleCmp = (props) => {
  const { darkMode, style, children } = props
  const defaultStyle = darkMode ? styles.titleDark : styles.title
  return (
    <Text style={{ ...defaultStyle, ...style }}>{children}</Text>
  )
}

export const Copy = connect(
  state => ({ darkMode: state.common.darkMode }),
  null,
)(CopyCmp)

export const CopyBlue = connect(
  state => ({ darkMode: state.common.darkMode }),
  null,
)(CopyBlueCmp)

export const Title = connect(
  state => ({ darkMode: state.common.darkMode }),
  null,
)(TitleCmp)

const styles = StyleSheet.create({
  copy: {
    color: palette.black,
    fontFamily: font,
    fontSize: 14,
    top: isIos ? 3 : 0,
  },

  copyBlue: {
    fontFamily: font,
    top: isIos ? 3 : 0,
    color: palette.blue,
    fontSize: 14,
  },

  copyDark: {
    color: palette.white,
    fontSize: 14,
  },

  title: {
    top: isIos ? 3 : 0,
    fontFamily: font,
    fontSize: 18,
    padding: 5,
    color: palette.black,
  },

  titleDark: {
    fontSize: 18,
    padding: 5,
    color: palette.white,
  },

})
