import React, { Component } from "react"
import { Animated, Easing, View, TouchableOpacity } from "react-native"
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler"
import ReactNativeHapticFeedback from "react-native-haptic-feedback"
import { Copy } from "../typography"
import __ from "../../utils/translations"
import styles from "./styles"

const offsets = { expense: 0, income: 120, transfer: 240 }

class TransactionType extends Component {
  state = {
    currentType: this.props.transaction.type,
    xOffset: new Animated.Value(offsets[this.props.transaction.type] || 0),
  }

  touchX = new Animated.Value(0)

  onPanGestureEvent = Animated.event([{ nativeEvent: { x: this.touchX } }], {
    useNativeDriver: true,
  })

  onClick = type => {
    const { setType } = this.props
    const { xOffset } = this.state
    let position = 0

    switch (type) {
      case "expense":
        position = 0
        setType("expense")
        this.setState({ currentType: "expense" })
        break
      case "income":
        position = 120
        setType("income")
        this.setState({ currentType: "income" })
        break
      case "transfer":
        position = 240
        setType("transfer")
        this.setState({ currentType: "transfer" })
        break
      default:
        position = 0
    }
    Animated.timing(xOffset, {
      toValue: position,
      easing: Easing.bezier(0.645, 0.045, 0.355, 1),
      duration: 450,
      useNativeDriver: false
    }).start()
  }

  render() {
    const { xOffset, currentType } = this.state

    const color = xOffset.interpolate({
      inputRange: [0, 100, 200],
      outputRange: [
        "rgba(189, 13, 13, 1)",
        "rgba(3, 120, 1, 1)",
        "rgba(4, 80, 135, 1)",
      ],
    })

    const width = xOffset.interpolate({
      inputRange: [0, 60, 120, 180, 240],
      outputRange: [100, 160, 100, 160, 100],
    })

    return (
      <View style={{ alignItems: "center", padding: 10 }}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              if (currentType === "expense") { this.onClick("income")}
              if (currentType === "income") { this.onClick("transfer")}
            }

            if (nativeEvent.state === State.END) {
              ReactNativeHapticFeedback.trigger("impactLight")
            }
          }}
        >
          <FlingGestureHandler
            direction={Directions.LEFT}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                if (currentType === "transfer") { this.onClick("income")}
                if (currentType === "income") { this.onClick("expense")}
              }

              ReactNativeHapticFeedback.trigger("impactLight")
            }}
          >
            <Animated.View style={styles.formFieldWrap}>
              <Animated.View
                style={[
                  styles.slider,
                  {
                    backgroundColor: color,
                    height: 40,
                    width,
                    left: xOffset,
                  },
                ]}
              />

              <TouchableOpacity
                onPress={() => this.onClick("expense")}
                style={[styles.transactionTypeButton]}>
                <View style={styles.typeWrap}>
                  <Copy style={{ color: "white" }}>EXPENSE</Copy>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.onClick("income")}
                style={[styles.transactionTypeButton]}>
                <View style={styles.typeWrap}>
                  <Copy style={{ color: "white" }}>INCOME</Copy>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.onClick("transfer")}
                style={[styles.transactionTypeButton]}>
                <View style={styles.typeWrap}>
                  <Copy style={{ color: "white" }}>TRANSFER</Copy>
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
