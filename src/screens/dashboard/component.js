import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Alert} from 'react-native';

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Transaction from "../../components/transaction"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"

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

  render(){
    return(
      <Screen>
        <ScrollView>
          <Title style={{alignSelf: "center"}}>{__("Dashboard", "hrv")}</Title>

          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
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
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("EntryForm")}
          style={styles.addButton}>
          <Copy style={{fontSize: 40, color: "#f0f0f0"}}>+</Copy>
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default withNavigation (Dashboard);

const styles = StyleSheet.create({

  addButton: {
    position: "absolute",
    bottom: 20,
    marginRight: 20,
    alignSelf: "flex-end",
    right: 0,
    alignItems:"center",
    justifyContent: "center",
    width: 60,
    height: 60,
    padding: 0,
    borderRadius: 30,
    backgroundColor: "green"
  }
})
