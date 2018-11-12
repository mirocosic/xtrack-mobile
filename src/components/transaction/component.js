import React, { Component } from "react"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"

import { withNavigation } from "react-navigation"

import Label from "../label"
import Swipeout from 'react-native-swipeout';

import { Copy, Title } from "../typography"
import Icon from "../icon"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import moment from "moment"
import styles from "./styles"

import { get } from "lodash"

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
      return {color: "#D32F2F"};
    case "income":
      return {color: "green"};
    case "transfer":
      return {color: "blue"};
  }
}

const renderDeleteButton = (transaction) => {

  if (transaction.archived) {
    return (
      <View style={styles.archiveButton}>
        <Icon style={{backgroundColor: "red"}}/>
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

class Transaction extends Component {

  render(){
    const { transaction } = this.props
    return(
      <Swipeout
        right={[{
          backgroundColor: "#f8f8fc",
          component: renderDeleteButton(transaction),
          onPress: ()=>this.props.delete(transaction)
        }]}
        style={{borderBottomWidth: 1, borderColor: "gray"}}
        sensitivity={10}
        buttonWidth={110}
        backgroundColor="#f8f8fc"
      >
        <TouchableOpacity onPress={()=>{
          this.props.select(transaction)
          this.props.navigation.navigate("TransactionForm", {transaction})
        }

        }>
        <View key={transaction.id} style={[styles.container, this.props.darkMode && styles.containerDark]}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Icon type={get(transaction, "category.icon")} style={{padding: 5, marginRight:10, backgroundColor: get(transaction, "category.color", "blue")}}/>
              <Copy>{transaction.category && transaction.category.name}</Copy>
            </View>
            <Text style={[styles.amount, getAmountColor(transaction.type)]}>
                {formatCurrency(transaction.amount)}
            </Text>
          </View>

          <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
            <Copy style={{fontSize: 12}}>{moment(transaction.timestamp).format("D.MM.YYYY. HH:mm")}</Copy>
            <Copy>{transaction.note}</Copy>
            <View style={styles.labels}>
              {transaction.labels &&
              transaction.labels.map((label)=>{
                return(
                  <Label key={label.uuid} label={label} style={{margin:0, marginLeft:5, marginRight:5}}/>
                )
              })}
            </View>
          </View>

          { false &&
            <TouchableOpacity onPress={()=>this.props.delete(transaction)} style={styles.deleteTrans}>
              <Copy style={{fontSize: 26, color: "white"}}>-</Copy>
            </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
    </Swipeout>
    )
  }
}

export default withNavigation(Transaction)
