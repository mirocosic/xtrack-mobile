import React, { Component } from "react"
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
    const { label } = this.props
    return (
      <View key={label.uuid} style={[styles.label, {backgroundColor: label.color}, this.props.style]}>
        <Copy style={{fontSize: 12, color: this.labelCopyColor(label.color)}}>{label.name}</Copy>
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
