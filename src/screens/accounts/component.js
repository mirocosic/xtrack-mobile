import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy, Title } from "../../components/typography"
import Icon from "../../components/icon"

import styles from "./styles"

import { get } from "lodash"

const accountBalance = (account, transactions) => {
  if (transactions.length === 0) return 0;

  const accountTransactions = transactions.filter((item)=>account.id === get(item, "account.id"));

  if (accountTransactions.length === 0) { return 0 }

  const total = accountTransactions.reduce((a, b)=>({amount: parseFloat(a.amount) + parseFloat(b.amount)}));

  return total.amount;
}

class Accounts extends Component {

  state = {
    name: ""
  }

  render(){
    return(
      <Screen>
        <Header title="Accounts" backBtn={true} backBtnPress={()=>this.props.navigation.goBack()}/>
        <ScrollView>
          <View>

            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={(text)=>this.setState({name: text})}
                placeholder="new account"
                value={this.state.name}
                />
              <TouchableOpacity style={styles.add}
                onPress={()=>{
                  this.setState({name: ""})
                  this.props.add(this.state.name)}}
                >
                <Copy style={{color: "white"}}>Add</Copy>
              </TouchableOpacity>
            </View>

            {this.props.accounts.map((account)=>(
              <TouchableOpacity key={account.id}

                onPress={()=>{
                  if (this.props.navigation.state.params.accountField === "from") {
                    this.props.setFrom(account);
                  } else {
                    this.props.setTo(account);
                  }

                  this.props.navigation.goBack()}}>

                <View key={account.id} style={[styles.wrap, this.props.darkMode && styles.wrapDark]}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Icon icon="money" style={{marginRight: 10}}/>
                    <Copy>{account.name + "  -  " + accountBalance(account, this.props.transactions)}</Copy>
                  </View>

                  <TouchableOpacity style={styles.delete} onPress={()=>this.props.delete(account.id)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>

            ))}
          </View>
          <Button title="Select" onPress={()=>this.props.navigation.navigate("EntryForm")}/>
        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation (Accounts);
