import React, { Component } from "react";
import { Alert, ScrollView, View, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Modalize from "react-native-modalize"
import { get } from "lodash"
import { Screen, Header } from "../../components"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy } from "../../components/typography"
import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

const defaultCategory = { icon: "shoppingBasket", color: "#0097A7" }

class CategoryEdit extends Component {

  state = {
    category: this.props.categories.filter(item => this.props.navigation.state.params.id === item.id)[0] || defaultCategory
  }

  input = React.createRef()

  iconsModal = React.createRef()

  colorModal = React.createRef()


  handleSave = (category) => {
    const { edit, add, setDefault, navigation } = this.props
    category.id ? edit(category) : add(category)
    category.defaultCategory && setDefault(category)
    navigation.goBack()
  }

  countTransactions = (catId) => {
    const { transactions } = this.props
    return transactions.filter(transaction => get(transaction, "category.id") === catId).length
  }

  deleteCategory = (category) => {
    const { remove, removeTransactions, navigation } = this.props
    if (this.countTransactions(category.id) > 0) {
      Alert.alert(
        "Warning!",
        "Cannot delete category that has transactions",
        [{
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete all transactions",
          onPress: () => { removeTransactions(category); remove(category); navigation.goBack() },
        }],
      )
    } else {
      remove(category)
      navigation.goBack()
    }
  }

  render() {
    const { navigation, add, edit, remove, setDefault, darkMode } = this.props
    const { category } = this.state
    return (
      <Screen>
        <Header
          icon={<Icon type={category.icon} textStyle={{ color: category.color }} />}
          title={category.name}
          backBtn
          actionBtn={<Icon type="trash-alt" />}
          actionBtnPress={() => this.deleteCategory(category)}
        />

        <ScrollView style={{ margin: 20 }}>

          <View style={styles.inputContainer}>
            <Copy>Name</Copy>
            <TextInput
              ref={this.input}
              style={[styles.input, darkMode && styles.inputDark]}
              onChangeText={text => this.setState({
                category: {
                  ...category,
                  ...{ name: text },
                },
              })}
              returnKeyType="done"
              onSubmitEditing={() => this.handleSave(category)}
              placeholder="category name"
              value={category.name}
              />
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Icon</Copy>
            <TouchableOpacity onPress={() => this.iconsModal.current.open()}>
              <Icon type={category.icon} textStyle={{ color: category.color, fontSize: 30 }} />
            </TouchableOpacity>
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Color</Copy>
            <TouchableOpacity onPress={() => this.colorModal.current.open()}>
              <View style={{ width: 40, height: 40, backgroundColor: category.color, borderRadius: 5 }} />
            </TouchableOpacity>
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Default category</Copy>
            <TouchableOpacity onPress={() => this.setState({ category: { ...category, defaultCategory: !category.defaultCategory } })}>
              <Copy style={{ color: "blue", fontSize: 20 }}>{category.defaultCategory ? "Yes" : "No"}</Copy>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.add}
            onPress={() => this.handleSave(category)}>
            <Copy style={{ color: "white" }}>Save</Copy>
          </TouchableOpacity>

        </ScrollView>

        <Modalize
          modalHeight={200}
          ref={this.colorModal}
        >
          <View style={styles.colorPicker}>
            { colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBox, category.color === color && styles.selectedColor, { backgroundColor: color }]}
                onPress={() => {
                  this.setState({ category: { ...category, ...{ color } } })
                  this.colorModal.current.close()
                }}
              />
            ))}
          </View>
        </Modalize>

        <Modalize
          modalHeight={300}
          ref={this.iconsModal}>
          <View style={{ padding: 20 }}>
            <CategoryIcons
              selected={category.icon || "car"}
              select={(value) => {
                this.setState({ category: { ...category, icon: value } })
                this.iconsModal.current.close()
              }}
            />
          </View>
        </Modalize>

      </Screen>
    )
  }
}

export default withNavigation(CategoryEdit)
