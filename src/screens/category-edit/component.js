import React, { Component } from "react"
import { Alert, ScrollView, View, TextInput, TouchableOpacity } from "react-native"
import { Modalize } from "react-native-modalize"
import { DarkModeContext } from "react-native-dark-mode"
import { get } from "lodash"
import LinearGradient from "react-native-linear-gradient"

import { Screen, Header } from "../../components"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy, CopyBlue } from "../../components/typography"
import styles from "./styles"
import { isAndroid } from "../../utils/os-utils"
import palette from "../../utils/palette"
import { BorderlessButton } from "react-native-gesture-handler"

const colors = ["#FF5722", "#F39A27", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"]

const defaultCategory = { icon: "shoppingBasket", color: "#0097A7" }

class CategoryEdit extends Component {
  static contextType = DarkModeContext

  state = { category: this.props.categories.filter(item => this.props.route.params.id === item.id)[0] || defaultCategory }

  input = React.createRef()

  iconsModal = React.createRef()

  colorModal = React.createRef()

  handleSave = (category) => {
    const { edit, add, setDefault, navigation } = this.props
    category.id ? edit(category) : add(category)
    //update default categories on edit only
    category.id && category.defaultCategory && setDefault(category)
    navigation.goBack()
  }

  countTransactions = (catId) => {
    const { transactions } = this.props
    return transactions.filter(transaction => get(transaction, "categoryId") === catId).length
  }

  deleteCategory = (category) => {
    const { remove, removeTransactions, navigation } = this.props
    if (this.countTransactions(category.id) > 0) {
      Alert.alert("Warning!", "Cannot delete category that has transactions", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete all transactions",
          onPress: () => {
            removeTransactions(category)
            remove(category)
            navigation.goBack()
          },
        },
      ])
    } else {
      remove(category)
      navigation.goBack()
    }
  }

  render() {
    const { category } = this.state
    const { theme } = this.props
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"
    return (
      <Screen>
        <Header
          icon={<Icon type={category.icon} textStyle={{ color: category.color }} />}
          title={category.name}
          backBtn={isAndroid}/>

        <ScrollView style={{ margin: 20 }} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={styles.inputContainer}>
              <Copy>Name</Copy>
              <TextInput
                ref={this.input}
                multiline
                autoFocus={!category.id}
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => this.setState({
                  category: {
                    ...category,
                    ...{ name: text },
                  },
                })
                }
                placeholder="category name"
                placeholderTextColor="gray"
                value={category.name}
              />
            </View>

            <View style={[styles.inlineBetween, { margin: 10 }]}>
              <Copy>Icon</Copy>
              <TouchableOpacity onPress={() => this.iconsModal.current.open() }>
                <Icon type={category.icon} textStyle={{ color: category.color, fontSize: 30 }} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inlineBetween, { margin: 10 }]}>
              <Copy>Color</Copy>
              <TouchableOpacity onPress={() => this.colorModal.current.open()}>
                <View style={{ width: 35, height: 30, backgroundColor: category.color, borderRadius: 5 }} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inlineBetween, { margin: 10 }]}>
              <Copy>Default category</Copy>
              <TouchableOpacity onPress={() => this.setState({ category: { ...category, defaultCategory: !category.defaultCategory } })}>
                {category.defaultCategory ? 
                <View style={{width: 30, height:30, borderRadius: 4, borderWidth: 2, borderColor: darkMode ? palette.light : palette.dark}}/>
                : 
                <View style={{width: 30, height:30, borderRadius: 4, borderWidth: 2, borderColor: darkMode ? palette.light : palette.dark, alignItems: "center", justifyContent: "center"}}>
                  <Icon type="check" textStyle={{fontSize: 18, color: darkMode ? palette.light : palette.dark}} />
                </View>}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Copy>Monthly Budget</Copy>
              <TextInput
                ref={this.input}
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => this.setState({
                  category: {
                    ...category,
                    ...{ budget: text },
                  },
                })
                }
                returnKeyType="done"
                keyboardType="numeric"
                onSubmitEditing={() => this.handleSave(category)}
                placeholder="add budget"
                placeholderTextColor="gray"
                value={category.budget}
              />
            </View>
          </View>

          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <BorderlessButton onPress={() => this.deleteCategory(category)}>
              <Icon type="trash-alt" textStyle={{color: darkMode ? palette.light : palette.dark}} />
            </BorderlessButton>
            <TouchableOpacity onPress={() => this.handleSave(category)} style={styles.addWrap}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#2292f4", "#2031f4"]} style={[styles.add]}>
                <Copy style={{ color: "white" }}>Save</Copy>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          
        </ScrollView>

        <Modalize adjustToContentHeight modalStyle={[styles.modal, darkMode && styles.modalDark]} ref={this.colorModal}>
          <View style={styles.colorPicker}>
            {colors.map(color => (
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

        <Modalize adjustToContentHeight modalStyle={[styles.modal, darkMode && styles.modalDark]} ref={this.iconsModal}>
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

export default CategoryEdit
