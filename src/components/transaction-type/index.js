import React, { Component } from "react"
import { Animated, Easing, View, TouchableOpacity } from "react-native"
import { Copy } from "../typography"
import styles from "./styles"

class TransactionType extends Component {

  state = { xOffset: new Animated.Value(0) }

  onClick = (type) => {
    let position = 0
    switch (type) {
      case "expense":
        position = 0
        break;
      case "income":
        position = 120
        break;
      case "transfer":
        position = 240
        break;
      default:
        position = 0
    }
    Animated.timing(this.state.xOffset, {
      toValue: position,
      easing: Easing.bezier(0.645, 0.045, 0.355, 1),
      duration: 450,
    }).start()
  }


  render() {
    const { transaction, setType } = this.props

    const color = this.state.xOffset.interpolate({
      inputRange: [0, 100, 200],
      outputRange: ["rgba(189, 13, 13, 1)", "rgba(3, 120, 1, 1)", "rgba(4, 80, 135, 1)"],
    });

    const width = this.state.xOffset.interpolate({
      inputRange: [0, 60, 120, 180, 240],
      outputRange: [100, 160, 100, 160, 100]
    })

    return (
      <View style={styles.formFieldWrap}>
        <Animated.View style={[styles.slider, { left: this.state.xOffset, backgroundColor: color, width: width }]} />
        <TouchableOpacity
          onPress={() => { setType("expense"); this.onClick("expense") }}
          style={[styles.transactionTypeButton]}>
          <View style={styles.typeWrap}>
            <Copy style={{ color: transaction.type === "expense" ? "white" : "white" }}>EXPENSE</Copy>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setType("income"); this.onClick("income") }}
          style={[styles.transactionTypeButton]}>
          <View style={styles.typeWrap}>
            <Copy style={{ color: transaction.type === "income" ? "white" : "white" }}>INCOME</Copy>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setType("transfer"); this.onClick("transfer") }}
          style={[styles.transactionTypeButton]}>
          <View style={styles.typeWrap}>
            <Copy style={{ color: transaction.type === "transfer" ? "white" : "white" }}>TRANSFER</Copy>
          </View>
        </TouchableOpacity>
      </View>
    )}
}

export default TransactionType
