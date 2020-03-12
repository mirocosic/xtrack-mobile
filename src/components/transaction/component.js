import React, { Component } from "react"
import { Alert, Text, View, TouchableOpacity, Platform, ActionSheetIOS } from "react-native"
import { withNavigation } from "react-navigation"
import Swipeout from "react-native-swipeout"
import moment from "moment"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"

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

const renderDeleteButton = () => (
  <View style={styles.deleteButton}>
    <Icon type="trash-alt" />
  </View>
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

class Transaction extends Component {

  static contextType = DarkModeContext

  deleteTransaction = (transaction) => {
    const { removeAllRecurring, removeFutureRecurring, deleteTransaction } = this.props

    if (transaction.recurring) {
      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Delete All", "Delete Future Transactions", "Delete Only This", "Cancel"],
            cancelButtonIndex: 3,
            title: "Warning!",
            message: "This is a recurring transaction. Please choose to delete all transactions, all future transactions,  or only this one.",
          }, (btnIdx) => {
            switch (btnIdx) {
              case 0:
                removeAllRecurring(transaction)
                break;
              case 1:
                removeFutureRecurring(transaction)
                break;
              case 2:
                deleteTransaction(transaction)
                break;
              default:
                break;
            }
          },
        )
      } else {
        Alert.alert("Warning!", "This is recurring transaction. Need to add Android specific code for deletion.")
      }
    } else {
      deleteTransaction({ id: transaction.id })
    }
  }

  render() {
    const { transaction, selectTransaction, navigation, toggleScroll, categories } = this.props
    const darkMode = this.context === "dark"
    return (
      <Swipeout
        right={[{
          backgroundColor: "#f8f8fc",
          component: renderDeleteButton(transaction),
          onPress: () => this.deleteTransaction(transaction),
        }]}
        style={{ borderBottomWidth: 1, borderColor: "gray" }}
        sensitivity={20}
        scroll={value => toggleScroll(value)}
        buttonWidth={110}
        backgroundColor="#f8f8fc">
        <TouchableOpacity onPress={() => {
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
      </Swipeout>
    )
  }
}

export default withNavigation(Transaction)
