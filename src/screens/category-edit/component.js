import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity} from "react-native";
import { withNavigation } from "react-navigation";
import { Screen, Header, Footer } from "../../components"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy } from "../../components/typography"
import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class CategoryEdit extends Component {

  state = {
    category: this.props.categories.filter(item => this.props.navigation.state.params.id === item.id)[0]
  }

  render() {
    const { navigation } = this.props
    const { category } = this.state
    return (
      <Screen>
        <Header
          icon={<Icon type={this.state.category.icon} style={{ backgroundColor: this.state.category.color }} />}
          title={this.state.category.name}
          backBtn
        />
        <ScrollView>
          <View>

            <View style={styles.colorPicker}>
              { colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorBox, this.state.category.color === color && styles.selectedColor, { backgroundColor: color }]}
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
                    ...this.state.category,
                    ...{name: text}
                  }})}
                returnKeyType="done"
                placeholder="category name"
                value={this.state.category.name}
                />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  this.props.edit(this.state.category)
                  navigation.goBack()
                }}
              >
                <Copy style={{ color: "white" }}>Save</Copy>
              </TouchableOpacity>
            </View>

          </View>

          <CategoryIcons selected={this.state.category.icon || "car"} select={(value) => this.setState({category: {...this.state.category, icon: value}})}/>

        </ScrollView>

      </Screen>
    )
  }
}

export default withNavigation(CategoryEdit)
