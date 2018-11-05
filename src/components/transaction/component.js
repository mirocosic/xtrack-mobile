import React, { Component } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"

import { Copy } from "../typography"
import __ from "../../utils/translations"

export default class Transaction extends Component {

  render(){
    const { transaction } = this.props
    return(
      <View key={transaction.id} style={styles.container}>
        <View>
          <Copy>{__("Type")}: {transaction.type}</Copy>
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
    margin: 10,
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
  }
})
