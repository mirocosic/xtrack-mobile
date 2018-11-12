import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import Category from "../../components/category"
import Icon from "../../components/icon"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { get } from "lodash"

import styles from "./styles"

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
            {
            // <View style={styles.typeButtonsWrap}>
            //   <TouchableOpacity onPress={()=>this.setState({type: "expense"})}
            //     style={[styles.typeButton, this.state.type === "expense" && styles.btnSelected, this.props.darkMode && styles.btnDark]}>
            //     <Copy style={this.state.type === "expense" && styles.copySelected}>{__("Expense")}</Copy>
            //   </TouchableOpacity>
            //
            //   <TouchableOpacity onPress={()=>this.setState({type: "income"})}
            //     style={[styles.typeButton, this.state.type === "income" && styles.btnSelected, this.props.darkMode && styles.btnDark]}>
            //       <Copy style={this.state.type === "income" && styles.copySelected}>{__("Income")}</Copy>
            //   </TouchableOpacity>
            // </View>
}
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
            .filter((item)=>item.type === this.state.type)
            .map((cat)=>(
              <Category data={cat} onPress={()=>{this.props.selectCategory(cat); this.props.navigation.goBack()}}/>
            ))
            .reverse()
            }
          </View>

        </ScrollView>
        <View style={{height: 40, borderTopWidth: 1}}>

          <TouchableOpacity onPress={()=>{
              this.props.navigation.navigate("TransactionForm")
              this.props.clearSelectedCategory()
              this.props.clearTransactionForm()
            }}
            style={styles.addButton}>
            <Copy style={{fontSize: 40, color: "#f0f0f0"}}>+</Copy>
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}

export default withNavigation (Categories);
