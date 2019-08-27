import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import Swipeout from "react-native-swipeout";
import moment from "moment"
import { get } from "lodash"
import Label from "../label"
import { Copy } from "../typography"
import Icon from "../icon"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

const getAmountColor = (type) => {
  switch (type) {
    case "expense":
      return { color: "#D32F2F" };
    case "income":
      return { color: "green" };
    case "transfer":
      return { color: "blue" };
    default:
      return { color: "#D32F2F" };
  }
}

const renderDeleteButton = (transaction) => {

  return (
    <View style={styles.deleteButton}>
      <Icon type="trash-alt" />
    </View>
  );

}

const renderCategory = (categories, id) => {
  const category = categories.find(cat => id === cat.id)

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon
        type={get(category, "icon", "")}
        textStyle={{ color: get(category, "color", "blue") }}
        style={{ padding: 5, marginRight: 10, backgroundColor: "white" }}
      />
      <Copy>{category && category.name}</Copy>
    </View>
  )
}

const Transaction = ({ transaction, selectTransaction, deleteTransaction, navigation, darkMode, toggleScroll, categories }) => (
  <Swipeout
    right={[{
      backgroundColor: "#f8f8fc",
      component: renderDeleteButton(transaction),
      onPress: () => deleteTransaction(transaction),
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
          { renderCategory(categories, transaction.category.id)}
          <Text style={[styles.amount, getAmountColor(transaction.type)]}>
            {formatCurrency(transaction.amount)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Copy style={{ fontSize: 12 }}>{moment(transaction.timestamp).format("D.MM.YYYY. HH:mm")}</Copy>
          <Copy>{transaction.note}</Copy>
          <View style={styles.labels}>
            {transaction.labels
              && transaction.labels.map(label => (
                <Label
                  key={label.uuid}
                  label={label}
                  style={{ marginLeft: 5, paddingRight: 10}} 
                />
              ))}
          </View>
        </View>

        { false && (
          <TouchableOpacity onPress={() => deleteTransaction(transaction)} style={styles.deleteTrans}>
            <Copy style={{ fontSize: 26, color: "white" }}>-</Copy>
          </TouchableOpacity>)
        }
      </View>
    </TouchableOpacity>
  </Swipeout>
)
const hocTransaction = withNavigation(Transaction)
export default hocTransaction
