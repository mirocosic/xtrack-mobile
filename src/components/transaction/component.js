import React from "react"
import { Animated, Text, View, Dimensions, useWindowDimensions } from "react-native"
import moment from "moment"
import { get } from "lodash"

import { PanGestureHandler, State, RectButton } from "react-native-gesture-handler"
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Label from "../label"
import { Copy } from "../typography"
import Icon from "../icon"
import { formatCurrency } from "../../utils/currency"
import palette from "../../utils/palette"
import { useDarkTheme } from "../../utils/ui-utils"
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
      <Icon type={get(category, "icon", "")} textStyle={{ color: get(category, "color", "blue") }} style={{ padding: 5, marginRight: 10 }} />
      <Copy>{category && category.name}</Copy>
    </View>
  )
}

const Transaction = ({ transaction, selectTransaction, deleteTransaction, navigation, categories }) => {

  const HEIGHT = 65
  
  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={{backgroundColor: "red", alignItems: "center", padding: 10, justifyContent: "center"}} 
                  onPress={() => deleteTransaction(transaction)}>
        <Icon type="trash" />
      </RectButton>
    );
  };

  return (
      <Swipeable renderRightActions={renderRightActions} containerStyle={{backgroundColor: "red"} }>
        <RectButton
            style={{ height: HEIGHT }}
            onPress={() => {
              selectTransaction(transaction)
              navigation.navigate("TransactionForm", { transactionId: transaction.id })
            }}>
            <View style={[styles.container, { height: HEIGHT }, useDarkTheme() && styles.containerDark]}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {renderCategory(categories, transaction.categoryId)}
                <Text style={[styles.amount, getAmountColor(transaction.type)]}>{formatCurrency(transaction.amount, transaction.currency)}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={styles.inline}>
                  <Copy style={{ fontSize: 12 }}>{moment(transaction.timestamp).format("D.MM.YYYY. HH:mm")}</Copy>
                  {transaction.recurring && (
                    <Icon type="sync" textStyle={{ color: "gray", fontSize: 14 }} style={{ width: 15, height: 15, marginLeft: 10 }} />
                  )}
                </View>
                <Copy>{transaction.note}</Copy>
                <View style={styles.labels}>
                  {transaction.labels
                    && transaction.labels.map(label => <Label key={label.uuid} label={label} style={{ marginLeft: 5, paddingRight: 10 }} />)}
                </View>
              </View>
            </View>
          </RectButton>
        </Swipeable>
  )
}

export default Transaction
