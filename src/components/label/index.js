import React, { Component } from "react"
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native"
import { Copy } from "../typography"
import styles from "./styles"

export default class Label extends Component {

  labelCopyColor = (labelColor) => {
    switch (labelColor) {
      case "blue":
        return "white"
      case "pink":
        return "black"
      default:
        return "white"
    }
  }

  render() {
    const { label, style, removeLabel } = this.props
    return (
      <View key={label.uuid} style={[styles.label, { backgroundColor: label.color }, style]}>
        <Copy style={{ fontSize: 12, color: this.labelCopyColor(label.color) }}>{ label.name }</Copy>
        { removeLabel && (
          <TouchableOpacity
            onPress={() => removeLabel(label)}
            style={styles.removeLabel}>
            <Copy style={{color: "white"}}>X</Copy>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

Label.propTypes = {
  label: PropTypes.object,
  style: PropTypes.object,
  removeLabel: PropTypes.func,
}
