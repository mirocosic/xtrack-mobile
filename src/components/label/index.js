import React, { Component } from "react"
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native"
import { Copy } from "../typography"
import styles from "./styles"

export default class Label extends Component {

  propTypes = {
    // style: PropTypes.object,
    label: PropTypes.string.isRequired,
  }

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
    const { label, style } = this.props
    return (
      <View key={label.uuid} style={[styles.label, { backgroundColor: label.color }, style]}>
        <Copy style={{fontSize: 12, color: this.labelCopyColor(label.color)}}>{ label.name }</Copy>
        { this.props.removeLabel &&
          <TouchableOpacity
            onPress={()=>this.props.removeLabel(label)}
            style={styles.removeLabel}>
            <Copy>X</Copy>
          </TouchableOpacity>
        }

      </View>
    )
  }
}
