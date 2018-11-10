import React, { Component } from "react"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"

import { withNavigation } from "react-navigation"

import Label from "../label"

import { Copy, Title } from "../typography"
import Icon from "../icon"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import moment from "moment"
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
      <TouchableOpacity onPress={()=>{
          this.props.select(transaction)
          this.props.navigation.navigate("TransactionForm", {transaction})
        }

        }>
        <View key={transaction.id} style={styles.container}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Icon style={{marginRight:10}}/>
            <View>

              <Title>{transaction.category && transaction.category.name}</Title>
              <Copy>{moment(transaction.date).format("D.MM.YYYY. HH:mm")}</Copy>
              <Copy>{transaction.note}</Copy>
              <View style={styles.labels}>
                {transaction.labels &&
                transaction.labels.map((label)=>{
                  return(
                    <Label label={label} />
                  )
                })}
              </View>
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
