import React, { Component } from "react"
import PropTypes from "prop-types"
import { Alert, View, TouchableOpacity } from "react-native"
import { DarkModeContext } from "react-native-dark-mode"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton } from "react-native-gesture-handler"

import { get, truncate } from "lodash"
import Icon from "../icon"
import { Copy } from "../typography"
import styles from "./styles"
import palette from "../../utils/palette"

class Category extends Component {
  static contextType = DarkModeContext

  countTransactions = catId => {
    const { transactions } = this.props
    return transactions.filter(
      transaction => get(transaction, "categoryId") === catId,
    ).length
  }

  renderDeleteButton = cat => (
    <RectButton
      style={styles.deleteButton}
      onPress={() => {
        this.deleteCategory(cat)
      }}>
      <Icon type="trash-alt" />
    </RectButton>
  )

  renderEditButton = cat => (
    <RectButton
      style={styles.editButton}
      onPress={() =>
        this.props.navigation.navigate("CategoryEdit", { id: cat.id })
      }>
      <Icon type="pen" />
    </RectButton>
  )

  renderActions = cat => (
    <View style={{ flexDirection: "row", width: 160 }}>
      {this.renderDeleteButton(cat)}
      {this.renderEditButton(cat)}
    </View>
  )

  deleteCategory = category => {
    const { remove, removeTransactions } = this.props
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
          },
        },
      ])
    } else {
      remove(category)
    }
  }

  render() {
    const { selectCategory, navigation, data, theme } = this.props
    const cat = data
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"

    return (
      <Swipeable
        renderRightActions={() => this.renderActions(cat)}
        containerStyle={{ borderBottomWidth: 1, borderColor: "gray" }}>
        <RectButton
          key={cat.id}
          style={[styles.wrap, darkMode && styles.wrapDark]}
          activeOpacity={darkMode ? 0.5 : 0.1}
          rippleColor={darkMode ? palette.darkGray : palette.lightBlue}
          onPress={() => navigation.navigate("CategoryEdit", { id: cat.id })}>
          <View
            key={cat.id}
            style={[styles.categoryWrap, darkMode && styles.catWrapDark]}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Icon
                type={cat.icon}
                style={{ marginRight: 10 }}
                textStyle={{ color: get(cat, "color", "blue") }}
              />
              <Copy style={{flexWrap: "wrap", flex: 1}}>
                {`${truncate(cat.name, {length: 135})} `}
                <Copy style={{ fontSize: 10 }}>{`(${this.countTransactions(cat.id)})`}</Copy>
              </Copy>
              {cat.defaultCategory && (
                <Icon
                  type="star"
                  textStyle={{ color: "orange", fontSize: 10 }}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                selectCategory(cat)
                navigation.navigate("CategoryEdit")
              }}>
              <Icon
                type="chevronRight"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ color: "gray" }}
              />
            </TouchableOpacity>
          </View>
        </RectButton>
      </Swipeable>
    )
  }
}

Category.propTypes = { remove: PropTypes.func.isRequired }

export default Category
