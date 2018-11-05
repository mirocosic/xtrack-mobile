import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"

class EntryForm extends Component<Props> {

  state = {
    amount: "500",
    date: "16.12.1983.",
    note: "Vino i cigare...",
    type: "expense"
  }

  render() {
    return (
      <Screen>
        <Title style={styles.welcome}>Enter your expense now!</Title>

        <View style={styles.typeButtonsWrap}>
          <TouchableOpacity onPress={()=>this.setState({type: "expense"})} style={[styles.typeButton, this.state.type === "expense" && styles.btnSelected]}>
            <Copy style={this.state.type === "expense" && styles.copySelected}>{__("Expense")}</Copy>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.setState({type: "income"})} style={[styles.typeButton, this.state.type === "income" && styles.btnSelected]}>
              <Copy style={this.state.type === "income" && styles.copySelected}>{__("Income")}</Copy>
          </TouchableOpacity>


        </View>

        <TextInput
            onChangeText={(value) => this.setState({amount: value})}
            value={this.state.amount}
            style={this.props.darkMode ? styles.textInputDark : styles.textInput}
            placeholder="amount"
            keyboardType="numbers-and-punctuation"
        />
        <TextInput
            onChangeText={(value) => this.setState({date: value})}
            value={this.state.date}
            style={this.props.darkMode ? styles.textInputDark : styles.textInput}
            placeholder="date"
        />
        <TextInput
            onChangeText={(value) => this.setState({note: value})}
            value={this.state.note}
            style={this.props.darkMode ? styles.textInputDark : styles.textInput}
            placeholder="note"
        />
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Categories")}>
          <Text style={styles.textInput}>{this.props.selectedCategory.name}</Text>
        </TouchableOpacity>

        <Button title="Done!" onPress={()=>{
            this.props.add({
              type: this.state.type,
              amount: this.state.amount,
              note: this.state.note,
              category: this.props.selectedCategory
            })
            this.props.navigation.navigate("Dashboard")
          }}
        />
    </Screen>
    );
  }
}

export default withNavigation(EntryForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  welcome: {
    textAlign: 'center',
    margin: 10,
    marginBottom: 30
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
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1
  },

  btnSelected: {
    backgroundColor: "green",
  },

  copySelected: {
    color: "white"
  }

});
