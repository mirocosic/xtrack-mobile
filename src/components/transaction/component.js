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

// const getTransactionColorCode = (type) => {
//   switch (type) {
//     case "expense":
//       return [styles.colorCode, styles.expense];
//     case "income":
//       return [styles.colorCode, styles.income];
//     case "transfer":
//       return [styles.colorCode, styles.tranfer];
//     default:
//       return [styles.colorCode, styles.expense];
//   }
// }

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

  if (transaction.archived) {
    return (
      <View style={styles.archiveButton}>
        <Icon style={{ backgroundColor: "red" }} />
        <Copy style={styles.archiveCopy}>Move to Messages</Copy>
      </View>
    );
  } else {
    return (
      <View style={styles.deleteButton}>
        <Icon style={{backgroundColor: "red"}}/>
        <Copy style={{color: "white"}}>Delete</Copy>
      </View>
    );
  }

}

const Transaction = ({
  transaction, selectTransaction, deleteTransaction, navigation, darkMode, toggleScroll,
}) => (
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon type={get(transaction, "category.icon")} textStyle={{color: get(transaction, "category.color", "blue")}} style={{ padding: 5, marginRight: 10, backgroundColor: "white" }} />
            <Copy>{transaction.category && transaction.category.name}</Copy>
          </View>
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
                  style={{ margin: 0, marginLeft: 5, marginRight: 5 }} />
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
