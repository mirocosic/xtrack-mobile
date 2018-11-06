import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Alert} from 'react-native';

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import Transaction from "../../components/transaction"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"

import styles from  "./styles"

class Dashboard extends Component {

  changeAccountFilter = () => {
    Alert.alert(
      __("Select account"),
      __("Please choose account"),
      this.props.accounts.map((account)=>{
        return {text: account.name, onPress: ()=>this.props.changeAccountFilter(account)}
      })

    )
  }

  calcExpenses = (account) => {
    const transactions = this.props.transactions;
    if (transactions.length === 0) return 0;
    const accountTransactions = transactions.filter((item)=>account.id===item.account.id && item.type === "expense");
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b)=>({amount: parseFloat(a.amount) + parseFloat(b.amount)}));

    return total.amount;
  }

  calcIncome = (account) => {
    const transactions = this.props.transactions;
    if (transactions.length === 0) return 0;
    const accountTransactions = transactions.filter((item)=>account.id===item.account.id && item.type === "income");
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b)=>({amount: parseFloat(a.amount) + parseFloat(b.amount)}));

    return total.amount;
  }

  calcTotal = (account) => {
    const transactions = this.props.transactions;

      if (transactions.length === 0) return 0;

      const accountTransactions = transactions.filter((item)=>account.id===item.account.id);

      if (accountTransactions.length === 0) { return 0 }

      const total = accountTransactions.reduce((a, b)=>({amount: parseFloat(a.amount) + parseFloat(b.amount)}));

      return total.amount;

  }

  render(){
    return(
      <Screen>
        <Header title="Dashboard"></Header>
        <ScrollView>

          { this.props.accounts.map((account)=>{
            return(
              <View style={styles.accountCard}>
                <Title>{account.name}</Title>
                <View style={styles.accountDetails}>
                  <Copy>{__("Expenses")}: {this.calcExpenses(account)}</Copy>
                  <Copy>{__("Income")}: {this.calcIncome(account)}</Copy>
                  <Copy>{__("Total")}: {this.calcTotal(account)}</Copy>
                </View>
              </View>
            )
          })}

          <View style={styles.accountCard}>
            <Title>{"All accounts"}</Title>
            <View style={styles.accountDetails}>
              <Copy>{__("Expenses")}: {this.props.expenses}</Copy>
              <Copy>{__("Income")}: {this.props.income}</Copy>
              <Copy>{__("Total")}: {this.props.total}</Copy>
            </View>
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

export default withNavigation (Dashboard);
