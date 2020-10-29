import React, { Component } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native"

import { Screen, Header, Footer } from "../../components"
import Category from "../../components/category"
import { CopyBlue } from "../../components/typography"
import { isAndroid } from "../../utils/os-utils"

class Categories extends Component {

  state = { scroll: true }

  render() {
    const { categories, navigation, selectCategory } = this.props
    const { scroll } = this.state

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
                  navigation={navigation}
                />
              ))
              .reverse()
            }
          </View>
        </ScrollView>

        <Footer>
          <View style={[{ alignItems: "center" }, isAndroid && { paddingBottom: 10 }]}>
            <TouchableOpacity onPress={() => navigation.navigate("CategoryEdit", { id: false })}>
              <CopyBlue>Add new category</CopyBlue>
            </TouchableOpacity>
          </View>
        </Footer>

      </Screen>
    )
  }
}

export default Categories
