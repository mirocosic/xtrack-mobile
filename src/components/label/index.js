import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import Icon from "../icon"
import { Copy } from "../typography"
import palette from "../../utils/palette"
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
      <View
        key={label.uuid}
        style={[styles.label, { backgroundColor: label.color, borderWidth: 1, borderColor: label.color ? label.color : palette.lightGray }, style]}>
        <Copy style={{ fontSize: 12, color: this.labelCopyColor(label.color) }}>{label.name}</Copy>
        {removeLabel && (
          <TouchableOpacity onPress={() => removeLabel(label)} style={styles.removeLabel}>
            <View style={{ backgroundColor: "white", borderRadius: 10, width: 16, height: 16, alignItems: "center", justifyContent: "center" }}>
              <Icon type="times" textStyle={{ color: label.color, fontSize: 12 }} style={{ marginTop: 1, marginLeft: 2 }} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
