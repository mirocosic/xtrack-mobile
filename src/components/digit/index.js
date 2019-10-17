import React, { Component } from "react"
import { Text, TouchableOpacity } from "react-native"

import styles from "./styles"

export default class Digit extends Component {

  state = {
    pressed: false
  }

  render() {
    return (
      <TouchableOpacity
        underlayColor="teal"
        activeOpacity={0.6}
        onPressIn={()=>this.setState({pressed: true})}
        onPressOut={()=>this.setState({pressed: false})}
        onShowUnderlay={()=>this.setState({pressed: true})}
        onHideUnderlay={()=>this.setState({pressed: false})}
        style={this.state.pressed ? styles.pressedDigit : styles.digit}
        onPress={() => this.props.handlePress(this.props.digit)}
      >
        <Text style={ this.state.pressed ? styles.pressedCopy : styles.copy}>{this.props.digit}</Text>
      </TouchableOpacity>
    )
  }
}
