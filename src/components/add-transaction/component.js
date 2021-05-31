import React from "react"
import { TouchableOpacity } from "react-native"

import Icon from "../icon"
import styles from "./styles"

const AddTransaction = props => (
  <TouchableOpacity
    onPress={() => {
      props.navigation.navigate("TransactionForm")
      props.clearSelectedCategory()
      props.clearTransactionForm()
    }}
    style={styles.addButton}>
    <Icon
      style={{
        backgroundColor: "teal",
        width: 50,
        height: 50,
        borderRadius: 25,
      }}
      textStyle={{ fontSize: 30 }}
      type="plus"
    />
  </TouchableOpacity>
)

export default AddTransaction
