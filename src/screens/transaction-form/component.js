import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"

class TransactionForm extends Component<Props> {

  state = {
    amount: "500",
    date: "16.12.1983.",
    note: "Vino i cigare...",
    type: "expense"
  }

  componentDidMount = () => {
    if (this.props.navigation.state.params) {
      const { type, amount, date, note } = this.props.navigation.state.params.transaction
      this.setState({
        type,
        amount,
        date,
        note
      })
    }

  }

  render() {
    return (
      <Screen style={{paddingLeft: 0, paddingRight: 0}}>
        <Title style={styles.welcome}>Enter your expense now!</Title>
        <View style={styles.wrap}>


          <View style={styles.typeButtonsWrap}>
            <TouchableOpacity onPress={()=>{this.setState({type: "expense"}); this.props.setTransferMode(false) }}
              style={[styles.typeButton, this.state.type === "expense" && styles.btnExpenseSelected, this.props.darkMode && styles.btnDark]}>
              <Copy style={this.state.type === "expense" && styles.copySelected}>{__("Expense")}</Copy>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{this.setState({type: "income"}); ; this.props.setTransferMode(false)}}
              style={[styles.typeButton, this.state.type === "income" && styles.btnIncomeSelected, this.props.darkMode && styles.btnDark]}>
                <Copy style={this.state.type === "income" && styles.copySelected}>{__("Income")}</Copy>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{this.setState({type: "transfer"}); ; this.props.setTransferMode(true)}}
              style={[styles.typeButton, this.state.type === "transfer" && styles.btnTransferSelected, this.props.darkMode && styles.btnDark]}>
                <Copy style={this.state.type === "transfer" && styles.copySelected}>{__("Transfer")}</Copy>
            </TouchableOpacity>


          </View>

          <TextInput
              onChangeText={(value) => this.setState({amount: value})}
              value={this.state.amount}
              style={this.props.darkMode ? styles.textInputDark : styles.textInput}
              placeholder="amount"
              keyboardAppearance={this.props.darkMode ? "dark" : "light"}
              keyboardType="numeric"
              returnKeyType="done"
          />
          <TextInput
              onChangeText={(value) => this.setState({date: value})}
              value={this.state.date}
              style={this.props.darkMode ? styles.textInputDark : styles.textInput}
              placeholder="date"
              returnKeyType="done"
              keyboardAppearance={this.props.darkMode ? "dark" : "light"}
          />
          <TextInput
              onChangeText={(value) => this.setState({note: value})}
              value={this.state.note}
              style={this.props.darkMode ? styles.textInputDark : styles.textInput}
              placeholder="note"
              returnKeyType="done"
              keyboardAppearance={this.props.darkMode ? "dark" : "light"}
          />

          { this.state.type === "transfer" &&
            <View>
              <Copy>From Account:</Copy>
                <TouchableOpacity
                  style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
                  onPress={()=>this.props.navigation.navigate("Accounts", {accountField: "from"})}>
                  <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>{this.props.fromAccount.name}</Text>
                </TouchableOpacity>
            </View>
          }

          <Copy>{this.state.type === "transfer" && "To "}Account:</Copy>
          <TouchableOpacity
            style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
            onPress={()=>this.props.navigation.navigate("Accounts", {accountField: "to"})}>
            <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>{this.props.toAccount.name}</Text>
          </TouchableOpacity>

          { this.state.type !== "transfer" &&
            <View>
              <Copy>Category:</Copy>
              <TouchableOpacity
                style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
                onPress={()=>this.props.navigation.navigate("Categories")}>
                <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>{this.props.selectedCategory.name}</Text>
              </TouchableOpacity>
            </View>
        }
          <Button title="Done!" onPress={()=>{
              this.props.add({
                account: this.props.toAccount,
                type: this.state.type,
                amount: this.state.type === "expense" ? -this.state.amount : this.state.amount,
                note: this.state.note,
                category: this.props.selectedCategory
              })
              this.props.navigation.navigate("Dashboard")
            }}
          />

        <Button title="Back" onPress={()=>this.props.navigation.goBack()}/>

        {this.props.navigation.state.params &&
         this.props.navigation.state.params.transaction &&
          <Button title="Delete" onPress={()=>{}}/>
        }
      </View>
    </Screen>
    );
  }
}

export default withNavigation(TransactionForm);

const styles = StyleSheet.create({

  wrap: {
    paddingLeft: 20,
    paddingRight: 20
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  welcome: {
    color: "white",
    textAlign: 'center',
    padding: 10,
    marginBottom: 30,
    backgroundColor: "teal"
  },

  textInput: {
    color: "black",
    fontSize: 20,
    width: 200,
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10
  },

  textInputDark: {
    color: "white",
    fontSize: 20,
    width: 200,
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
    margin: 10
  },

  typeButtonsWrap: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  typeButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: "black"
  },

  btnExpenseSelected: {
    backgroundColor: "red",
  },

  btnIncomeSelected: {
    backgroundColor: "green",
  },

  btnTransferSelected: {
    backgroundColor: "blue",
  },

  btnDark: {
    borderColor: "white"
  },

  copySelected: {
    color: "white"
  },

  selectBox: {
    borderWidth: 1,
  },

  selectBoxDark: {
    borderColor: "white"
  }

});
