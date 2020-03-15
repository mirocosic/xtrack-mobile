import React from "react"
import { Text } from "react-native"
import { connect } from "react-redux"
import { useDarkMode } from "react-native-dark-mode"
import __ from "../../utils/translations"

import styles from "./styles"

export const font = "DIN 30640 Pro"

const CopyCmp = (props) => {
  const { style, children } = props
  const defaultStyle = useDarkMode() ? styles.copyDark : styles.copy
  return (
    <Text style={{ ...defaultStyle, ...style }}>{__(children)}</Text>
  )
}

const CopyBlueCmp = (props) => {
  const { darkMode, style, children } = props
  const defaultStyle = useDarkMode() ? styles.copyDark : styles.copyBlue
  return (
    <Text style={{ ...defaultStyle, ...style }}>{__(children)}</Text>
  )
}

const TitleCmp = (props) => {
  const { darkMode, style, children } = props
  const defaultStyle = useDarkMode() ? styles.titleDark : styles.title
  return (
    <Text style={{ ...defaultStyle, ...style }}>{__(children)}</Text>
  )
}

export const Copy = connect(
  state => ({ language: state.common.language }),
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
