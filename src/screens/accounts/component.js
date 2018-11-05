import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"

class Accounts extends Component {

  state = {
    name: ""
  }

  render(){
    return(
      <Screen>
        <ScrollView>
          <Title style={{alignSelf: "center"}}>Accounts</Title>
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
                  <Copy>{account.name}</Copy>
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

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    margin:10
  },

  wrapDark: {
    borderColor: "white"
  },

  inputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  input: {
    color: "black",
    fontSize: 20,
    padding: 20,
    margin: 20,
    width: 200,
    borderBottomWidth: 1
  },

  inputDark: {
    color: "white",
    borderColor: "white"
  },

  add: {
    width: 50,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  },

  delete: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  }
})
