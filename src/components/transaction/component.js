import React from "react"
import { Text, View, Dimensions } from "react-native"
import moment from "moment"
import { get } from "lodash"
import { useDarkMode } from "react-native-dark-mode"

import Animated, {
  add,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
} from "react-native-reanimated"

import { PanGestureHandler, State, RectButton } from "react-native-gesture-handler"

import { 
  usePanGestureHandler, useValue, snapPoint,
  timing,
  useClock,
  minus,
  clamp,
 } from "react-native-redash/lib/module/v1"

import Label from "../label"
import { Copy } from "../typography"
import Icon from "../icon"
import { formatCurrency } from "../../utils/currency"
import palette from "../../utils/palette"
import styles from "./styles"

const getAmountColor = (type) => {
  switch (type) {
    case "expense":
      return { color: palette.red }
    case "income":
      return { color: palette.green }
    case "transfer":
      return { color: palette.blue }
    default:
      return { color: palette.red }
  }
}

const renderCategory = (categories, id) => {
  const category = categories.find(cat => id === cat.id)

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon
        type={get(category, "icon", "")}
        textStyle={{ color: get(category, "color", "blue") }}
        style={{ padding: 5, marginRight: 10 }}
      />
      <Copy>{category && category.name}</Copy>
    </View>
  )
}

const HEIGHT = 65
const { width } = Dimensions.get("window")
const snapPoints = [-width, -100, 0];

const Transaction = ({ transaction, selectTransaction, deleteTransaction, navigation, categories }) => {

  const darkMode = useDarkMode()

  const {
    gestureHandler, translation,
    velocity,
    state,
  } = usePanGestureHandler()
  const translateX = useValue(0)

  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const deleteOpacity = useValue(1);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue(0);

  const onSwipe = () => {
    deleteTransaction(transaction)
  }

  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(translateX, add(offsetX, clamp(translation.x,  -9999, minus(offsetX) )))
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: HEIGHT, to: 0 })),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], onSwipe)),
      ]),
    ],
    [onSwipe],
  );

  return (
    <Animated.View>
      <Animated.View style={[styles.background]}>
        <RectButton
          onPress={() => deleteTransaction(transaction)}
          style={{ alignItems: "center", justifyContent: "center", backgroundColor: palette.red, paddingHorizontal: 20 }}
          >
          <Copy>Delete</Copy>
        </RectButton>
      </Animated.View>
      <PanGestureHandler failOffsetY={[-5, 5]} activeOffsetX={[-5, 5]} {...gestureHandler}>
        <Animated.View style={{ borderBottomWidth: 1, borderBottomColor: palette.gray, height, transform: [{ translateX }] }}>
          <RectButton
            style={[styles.container, darkMode && styles.containerDark]}
            onPress={() => {
              selectTransaction(transaction)
              navigation.navigate("TransactionForm", { transactionId: transaction.id })
            }}>
            <View
              key={transaction.id}
              >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                { renderCategory(categories, transaction.categoryId)}
                <Text style={[styles.amount, getAmountColor(transaction.type)]}>
                  {formatCurrency(transaction.amount, transaction.currency)}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={styles.inline}>
                  <Copy style={{ fontSize: 12 }}>{moment(transaction.timestamp).format("D.MM.YYYY. HH:mm")}</Copy>
                  {transaction.recurring && (
                  <Icon
                    type="sync"
                    textStyle={{ color: "gray", fontSize: 14 }}
                    style={{ width: 15, height: 15, marginLeft: 10 }}
                  />
                  )}
                </View>
                <Copy>{transaction.note}</Copy>
                <View style={styles.labels}>
                  {transaction.labels
                      && transaction.labels.map(label => (
                        <Label
                          key={label.uuid}
                          label={label}
                          style={{ marginLeft: 5, paddingRight: 10 }}
                          />
                      ))}
                </View>
              </View>
            </View>
          </RectButton>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default Transaction
