import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import moment from "moment"
import { get } from "lodash"
import { useDarkMode } from "react-native-dark-mode"

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

const Transaction = ({ transaction, selectTransaction, navigation, categories }) => {

  const darkMode = useDarkMode()

  return (
    <TouchableOpacity
      style={{ borderBottomWidth: 1, borderColor: "gray" }}
      onPress={() => {
        selectTransaction(transaction)
        navigation.navigate("TransactionForm", { transaction })
      }}>
      <View key={transaction.id} style={[styles.container, darkMode && styles.containerDark]}>
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
    </TouchableOpacity>
  )
}

export default Transaction
