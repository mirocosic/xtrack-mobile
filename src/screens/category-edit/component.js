import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity} from "react-native";
import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy } from "../../components/typography"
import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class CategoryEdit extends Component {

  render() {
    const { categories, navigation } = this.props
    const category = categories.filter(item => navigation.state.params.id === item.id)[0]

    return (
      <Screen>
        <Header
          icon={<Icon type={category.icon} style={{ backgroundColor: category.color }} />}
          title={category.name}
          backBtn={true}
          backBtnPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View>

            <View style={styles.colorPicker}>
              { colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorBox, category.color === color && styles.selectedColor, { backgroundColor: color }]}
                  onPress={() => this.setState({
                    category: {
                      ...category,
                      ...{ color },
                    },
                  })}
                />
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={(text)=>this.setState({
                  category: {
                    ...category,
                    ...{name: text}
                  }})}
                returnKeyType="done"
                placeholder="category name"
                value={category.name}
                />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  this.props.edit(category)
                  navigation.goBack()
                }}
              >
                <Copy style={{ color: "white" }}>Save</Copy>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation(CategoryEdit)
