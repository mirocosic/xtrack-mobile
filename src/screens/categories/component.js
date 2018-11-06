import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"


class Categories extends Component {

  state = {
    categoryName: "",
    type: "expense"
  }

  render(){
    return(
      <Screen>
        <Header title="Categories" backBtn={true} backBtnPress={()=>this.props.navigation.goBack()}/>
        <ScrollView>
          <View>

            <View style={styles.typeButtonsWrap}>
              <TouchableOpacity onPress={()=>this.setState({type: "expense"})}
                style={[styles.typeButton, this.state.type === "expense" && styles.btnSelected, this.props.darkMode && styles.btnDark]}>
                <Copy style={this.state.type === "expense" && styles.copySelected}>{__("Expense")}</Copy>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.setState({type: "income"})}
                style={[styles.typeButton, this.state.type === "income" && styles.btnSelected, this.props.darkMode && styles.btnDark]}>
                  <Copy style={this.state.type === "income" && styles.copySelected}>{__("Income")}</Copy>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={(text)=>this.setState({categoryName: text})}
                returnKeyType="done"
                placeholder="new category"
                value={this.state.categoryName}
                />
              <TouchableOpacity style={styles.add}
                onPress={()=>{
                  this.setState({categoryName: ""})
                  this.props.add({name: this.state.categoryName, type: this.state.type})}}
                >
                <Copy style={{color: "white"}}>Add</Copy>
              </TouchableOpacity>
            </View>

            {this.props.categories
            .filter((item)=>{
              console.log(item);
              console.log(this.state.type);
              return item.type === this.state.type
            })
            .map((cat)=>(
              <TouchableOpacity key={cat.id}

                onPress={()=>{this.props.selectCategory(cat); this.props.navigation.goBack()}}>
                <View key={cat.id} style={[styles.categoryWrap, this.props.darkMode && styles.catWrapDark]}>
                  <Copy>{cat.name}</Copy>
                  <TouchableOpacity style={styles.delete} onPress={()=>this.props.delete(cat.id)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

            ))
            .reverse()
            }
          </View>
          <Button title="Select" onPress={()=>this.props.navigation.navigate("EntryForm")}/>
        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation (Categories);

const styles = StyleSheet.create({
  categoryWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    margin:10
  },

  catWrapDark: {
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

  btnSelected: {
    backgroundColor: "green",
  },

  btnDark: {
    borderColor: "white"
  },

  copySelected: {
    color: "white"
  },
})
