import React from "react"
import { Text, View, TouchableOpacity, Animated } from "react-native"
import moment from "moment"
import { get } from "lodash"
import { useDarkMode } from "react-native-dark-mode"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton } from "react-native-gesture-handler"

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

const renderActions = (transaction, deleteTransaction) => (
  <RectButton
    onPress={() => deleteTransaction(transaction)}
    style={{ alignItems: "center", justifyContent: "center", backgroundColor: palette.red, paddingHorizontal: 20 }}
    >
    <Copy>Delete</Copy>
  </RectButton>
)

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

const Transaction = ({ transaction, selectTransaction, deleteTransaction, navigation, categories }) => {

  const darkMode = useDarkMode()

  return (
    <Swipeable
      renderRightActions={() => renderActions(transaction, deleteTransaction)}
      containerStyle={{ borderBottomWidth: 1, borderColor: "gray" }}
      >
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
    </Swipeable>
  )
}

export default Transaction
