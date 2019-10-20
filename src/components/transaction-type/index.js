import React, { Component } from "react"
import { Animated, Easing, View, TouchableOpacity } from "react-native"
import { FlingGestureHandler, Directions, State } from "react-native-gesture-handler"
import { Copy } from "../typography"
import styles from "./styles"

class TransactionType extends Component {

  state = {
    currentType: "expense",
    xOffset: new Animated.Value(0),
  }

  touchX = new Animated.Value(0);

  onPanGestureEvent = Animated.event([{ nativeEvent: { x: this.touchX } }], { useNativeDriver: true })

  onClick = (type) => {
    const { xOffset } = this.state
    let position = 0
    switch (type) {
      case "expense":
        position = 0
        this.setState({ currentType: "expense" })
        break;
      case "income":
        position = 120
        this.setState({ currentType: "income" })
        break;
      case "transfer":
        position = 240
        this.setState({ currentType: "transfer" })
        break;
      default:
        position = 0
    }
    Animated.timing(xOffset, {
      toValue: position,
      easing: Easing.bezier(0.645, 0.045, 0.355, 1),
      duration: 450,
    }).start()
  }

  render() {
    const { transaction, setType } = this.props
    const { xOffset, currentType } = this.state

    const color = xOffset.interpolate({
      inputRange: [0, 100, 200],
      outputRange: ["rgba(189, 13, 13, 1)", "rgba(3, 120, 1, 1)", "rgba(4, 80, 135, 1)"],
    });

    const width = xOffset.interpolate({
      inputRange: [0, 60, 120, 180, 240],
      outputRange: [100, 160, 100, 160, 100]
    })

    return (
      <View style={{ alignItems: "center", height: 100, padding: 10 }}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              if (currentType === "expense") {
                this.onClick("income")
              }

              if (currentType === "income") {
                this.onClick("transfer")
              }
            }
          }}>

          <FlingGestureHandler
            direction={Directions.LEFT}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                if (currentType === "transfer") {
                  this.onClick("income")
                }

                if (currentType === "income") {
                  this.onClick("expense")
                }
              }

            }}>
            <Animated.View style={styles.formFieldWrap}>
              <Animated.View style={[
                styles.slider,
                {
                  backgroundColor: color,
                  height: 40,
                  width,
                  left: xOffset,
                }]}>

              </Animated.View>


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
            </Animated.View>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </View>
    )
  }
}

export default TransactionType
