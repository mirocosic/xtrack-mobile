import React, { Component } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";
import { Screen, Header, Footer } from "../../components"
import Category from "../../components/category"
import { CopyBlue } from "../../components/typography"

class Categories extends Component {

  state = {
    categoryName: "",
    type: "expense",
    scroll: true,
  }

  render() {
    const { categories, navigation, add, clearTransactionForm, clearSelectedCategory, selectCategory, darkMode } = this.props
    const { categoryName, type, scroll } = this.state

    return (
      <Screen>
        <Header title="Categories" backBtn />
        <ScrollView scrollEnabled={scroll}>
          <View>
            {categories
              .sort((a, b) => a.name < b.name)
              .map(cat => (
                <Category
                  key={cat.id}
                  data={cat}
                  onPress={() => { selectCategory(cat); navigation.goBack() }}
                  toggleScroll={value => this.setState({ scroll: value })}
                />
              ))
              .reverse()
            }
          </View>
        </ScrollView>

        <Footer>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("CategoryEdit", { id: false })}>
              <CopyBlue>Add new category</CopyBlue>
            </TouchableOpacity>
          </View>
        </Footer>

      </Screen>
    )
  }
}

export default withNavigation(Categories);
