import React, { Component } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"

import { Copy } from "../typography"
import __ from "../../utils/translations"

const getTransactionColorCode = (type) => {
  switch(type){
    case "expense":
      return [styles.colorCode, styles.expense];
    case "income":
      return [styles.colorCode, styles.income];
    case "transfer":
      return [styles.colorCode, styles.tranfer];
  }
}

export default class Transaction extends Component {

  render(){
    const { transaction } = this.props
    return(
      <View key={transaction.id} style={styles.container}>
        <View style={getTransactionColorCode(transaction.type)}></View>
        <View>

          <Copy>{__("Amount")}: {transaction.amount}</Copy>
          <Copy>{__("Category")}: {transaction.category && transaction.category.name}</Copy>
          <Copy>{__("Date")}: {transaction.date}</Copy>
          <Copy>{__("Note")}: {transaction.note}</Copy>
        </View>

        <TouchableOpacity onPress={()=>this.props.delete(transaction)} style={styles.deleteTrans}>
          <Copy style={{fontSize: 26, color: "white"}}>-</Copy>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  deleteTrans: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  colorCode: {
    width: 20,
    height: "100%",
    borderRadius: 10
  },

  expense: {
    backgroundColor: "red",
  },

  income: {
    backgroundColor: "green"
  },

  tranfer: {
    backgroundColor: "blue"
  }
})
