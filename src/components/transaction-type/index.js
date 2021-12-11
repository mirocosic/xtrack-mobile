import React, { useEffect, useState, useRef } from "react"
import { Animated, Easing, View, TouchableOpacity } from "react-native"
import { FlingGestureHandler, Directions, State } from "react-native-gesture-handler"
import ReactNativeHapticFeedback from "react-native-haptic-feedback"
import { Copy } from "../typography"
import __ from "../../utils/translations"
import styles from "./styles"

const offsets = { expense: 0, income: 120, transfer: 240 }

const TransactionType = (props) => {
  const { setType, transaction: { type }} = props
  const offsetX = useRef(new Animated.Value(0)).current

  const color = offsetX.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [
      "rgba(189, 13, 13, 1)",
      "rgba(3, 120, 1, 1)",
      "rgba(4, 80, 135, 1)",
    ],
  })

  const width = offsetX.interpolate({
    inputRange: [0, 60, 120, 180, 240],
    outputRange: [100, 160, 100, 160, 100],
  })

  useEffect(
    () => {
      Animated.timing(offsetX, {
        toValue: offsets[type],
        easing: Easing.bezier(0.645, 0.045, 0.355, 1),
        duration: 450,
        useNativeDriver: false
      }).start()

    }, [type]
  )

  return (
    <View style={{ alignItems: "center", padding: 10 }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            if (type === "expense") { setType("income") }
            if (type === "income") { setType("transfer")}
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
              if (type === "transfer") { setType("income")}
              if (type === "income") { setType("expense")}
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
                  left: offsetX,
                },
              ]}
            />

            <TouchableOpacity
              onPress={() => setType("expense")}
              style={[styles.transactionTypeButton]}>
              <View style={styles.typeWrap}>
                <Copy style={{ color: "white" }}>EXPENSE</Copy>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setType("income")}
              style={[styles.transactionTypeButton]}>
              <View style={styles.typeWrap}>
                <Copy style={{ color: "white" }}>INCOME</Copy>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setType("transfer")}
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

export default TransactionType
