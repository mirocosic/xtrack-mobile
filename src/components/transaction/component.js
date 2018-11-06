import React, { Component } from "react"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"

import { withNavigation } from "react-navigation"

import { Copy } from "../typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"

import styles from "./styles"

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

const getAmountColor = (type) => {
  switch(type){
    case "expense":
      return {color: "red"};
    case "income":
      return {color: "green"};
    case "transfer":
      return {color: "blue"};
  }
}

class Transaction extends Component {

  render(){
    const { transaction } = this.props
    return(
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("TransactionForm", {transaction})}>
        <View key={transaction.id} style={styles.container}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={getTransactionColorCode(transaction.type)}></View>
            <View>

              <Copy>{__("Category")}: {transaction.category && transaction.category.name}</Copy>
              <Copy>{__("Date")}: {transaction.date}</Copy>
              <Copy>{__("Note")}: {transaction.note}</Copy>
            </View>
          </View>

          <Text style={[styles.amount, getAmountColor(transaction.type)]}>
            {formatCurrency(transaction.amount)}
          </Text>

          { false &&
            <TouchableOpacity onPress={()=>this.props.delete(transaction)} style={styles.deleteTrans}>
              <Copy style={{fontSize: 26, color: "white"}}>-</Copy>
            </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Transaction)
