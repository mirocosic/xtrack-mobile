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
    const { categories, navigation, add, clearTransactionForm, clearSelectedCategory, selectCategory, darkMode } = this.props
    const { categoryName, type } = this.state
    return (
      <Screen>
        <Header title="Categories" />
        <ScrollView>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => this.setState({ categoryName: text })}
                returnKeyType="done"
                placeholder="new category"
                value={categoryName}
              />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  this.setState({ categoryName: "" })
                  add({ name: categoryName, type })
                }}>
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

        <TouchableOpacity
          style={{marginBottom: 40, alignItems: "center"}}
          onPress={() => this.props.navigation.goBack()}>
          <Copy>{`< Go Back `}</Copy>
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default withNavigation(Categories);
