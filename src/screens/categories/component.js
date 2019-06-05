import React, { Component } from "react"
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import Category from "../../components/category"
import { Copy } from "../../components/typography"
import styles from "./styles"

class Categories extends Component {

  state = {
    categoryName: "",
    type: "expense",
  }

  render() {
    const { categories, navigation, add, clearTransactionForm, clearSelectedCategory, selectCategory } = this.props
    const { categoryName, type } = this.state
    return (
      <Screen>
        <Header title="Categories" backBtn={true} backBtnPress={() => navigation.goBack()} />
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
              <TextInput
                style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={text => this.setState({ categoryName: text })}
                returnKeyType="done"
                placeholder="new category"
                value={categoryName}
              />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  this.setState({ categoryName: "" })
                  add({ name: categoryName, type })}
                }>
                <Copy style={{ color: "white" }}>Add</Copy>
              </TouchableOpacity>
            </View>

            {categories
              .filter(item => item.type === type)
              .map(cat => (
                <Category data={cat} onPress={() => { selectCategory(cat); navigation.goBack() }} />
              ))
              .reverse()
            }
          </View>

        </ScrollView>
        <View style={{ height: 40, borderTopWidth: 1 }}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TransactionForm")
              clearSelectedCategory()
              clearTransactionForm()
            }}
            style={styles.addButton}>
            <Copy style={{ fontSize: 40, color: "#f0f0f0" }}>+</Copy>
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}

export default withNavigation(Categories);
