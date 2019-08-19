import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Screen, Header } from "../../components"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy } from "../../components/typography"
import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class CategoryEdit extends Component {

  state = {
    category: this.props.categories.filter(item => this.props.navigation.state.params.id === item.id)[0] || {}
  }

  render() {
    const { navigation, add, edit, remove } = this.props
    const { category } = this.state
    return (
      <Screen>
        <Header
          icon={<Icon type={category.icon} style={{ backgroundColor: category.color }} />}
          title={category.name}
          backBtn
          actionBtn={<Icon type="trash-alt" />}
          actionBtnPress={() => { remove(category); navigation.goBack() }}
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
                onChangeText={text => this.setState({
                  category: {
                    ...category,
                    ...{ name: text },
                  }})}
                returnKeyType="done"
                placeholder="category name"
                value={category.name}
                />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  category.id ? edit(category) : add(category)
                  navigation.goBack()
                }}
              >
                <Copy style={{ color: "white" }}>Save</Copy>
              </TouchableOpacity>
            </View>

          </View>

          <CategoryIcons selected={category.icon || "car"} select={value => this.setState({category: {...category, icon: value}})}/>

        </ScrollView>

      </Screen>
    )
  }
}

export default withNavigation(CategoryEdit)
