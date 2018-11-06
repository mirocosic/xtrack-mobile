import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Alert} from 'react-native';

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import Transaction from "../../components/transaction"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"

import styles from  "./styles"

class Transactions extends Component {

  changeAccountFilter = () => {
    Alert.alert(
      __("Select account"),
      __("Please choose account"),
      [
        ...this.props.accounts.map((account)=>{
          return {text: account.name, onPress: ()=>this.props.changeAccountFilter(account)}
        }),
        {text: "All accounts", onPress: ()=>this.props.changeAccountFilter(false)}
      ]
    )
  }

  render(){
    return(
      <Screen>
        <Header title="Transactions"></Header>
        <ScrollView>

          <View style={styles.overview}>
            <View>
              <Copy>{__("Expenses")}: {this.props.expenses}</Copy>
              <Copy>{__("Income")}: {this.props.income}</Copy>
              <Copy>{__("Total")}: {this.props.total}</Copy>
            </View>

            <TouchableOpacity onPress={this.changeAccountFilter}>
              <Copy>Account: {this.props.accountFilter.name || "All accounts"}</Copy>
            </TouchableOpacity>
          </View>


          <View>

            {this.props.entries
              .filter((item)=>{
                if (!this.props.accountFilter) {return true}
                if (!item.account) {return true}
                return item.account.id === this.props.accountFilter.id
              })
              .map((value)=>(<Transaction key={value.id} transaction={value}/>))
              .reverse()}
          </View>

        </ScrollView>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("TransactionForm")}
          style={styles.addButton}>
          <Copy style={{fontSize: 40, color: "#f0f0f0"}}>+</Copy>
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default withNavigation (Transactions);
