import React, { Component } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";
import { Screen, Header, Footer } from "../../components"
import Category from "../../components/category"
import { Copy } from "../../components/typography"

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
        <Header title="Categories" backBtn />
        <ScrollView>
          <View>
            {categories
              //.filter(item => item.type === type)
              .sort((a, b) => a.name < b.name)
              .map(cat => (
                <Category key={cat.id} data={cat} onPress={() => { selectCategory(cat); navigation.goBack() }} />
              ))
              .reverse()
            }
          </View>
        </ScrollView>

        <Footer>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("CategoryEdit", { id: false })}>
              <Copy style={{ color: "teal" }}>Add new category</Copy>
            </TouchableOpacity>
          </View>
        </Footer>

      </Screen>
    )
  }
}

export default withNavigation(Categories);
