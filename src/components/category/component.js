import React, { Component } from "react"
import PropTypes from "prop-types"
import { Alert, View, TouchableOpacity } from "react-native"
import Swipeout from "react-native-swipeout"
import { withNavigation } from "react-navigation"
import { DarkModeContext } from "react-native-dark-mode"

import { get } from "lodash"
import Icon from "../icon"
import { Copy } from "../typography"
import styles from "./styles"

class Category extends Component {

  static contextType = DarkModeContext

  countTransactions = (catId) => {
    const { transactions } = this.props
    return transactions.filter(transaction => get(transaction, "categoryId") === catId).length
  }

  renderDeleteButton = () => (
    <View style={styles.deleteButton}>
      <Icon type="trash-alt" />
    </View>
  );

  renderEditButton = () => (
    <View style={styles.editButton}>
      <Icon type="pen" />
    </View>
  )

  deleteCategory = (category) => {
    const { remove, removeTransactions } = this.props
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
          onPress: () => { removeTransactions(category); remove(category) },
        }],
      )
    } else {
      remove(category)
    }
  }

  render() {
    const cat = this.props.data
    const { selectCategory, navigation, toggleScroll } = this.props
    const darkMode = this.context === "dark"

    return (
      <Swipeout
        right={[{
          backgroundColor: "#f8f8fc",
          component: this.renderDeleteButton(),
          onPress: () => this.deleteCategory(cat),
        },
        {
          backgroundColor: "blue",
          component: this.renderEditButton(),
          onPress: () => navigation.navigate("CategoryEdit", { id: cat.id }),
        }]}
        style={{ borderBottomWidth: 1, borderColor: "gray" }}
        sensitivity={20}
        scroll={value => toggleScroll(value)}
        buttonWidth={70}
        backgroundColor="#f8f8fc">

        <TouchableOpacity
          key={cat.id}
          onPress={() => navigation.navigate("CategoryEdit", { id: cat.id })}>

          <View key={cat.id} style={[styles.categoryWrap, darkMode && styles.catWrapDark]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon type={cat.icon} style={{ marginRight: 10 }} textStyle={{ color: get(cat, "color", "blue") }} />
              <Copy>
                {`${cat.name} ` }
                <Copy style={{ fontSize: 10 }}>
                  {`(${this.countTransactions(cat.id)})`}
                </Copy>
              </Copy>
              {
                cat.defaultCategory
                && <Icon type="star" textStyle={{ color: "orange", fontSize: 10 }} />
              }
            </View>

            <TouchableOpacity onPress={() => {
              selectCategory(cat)
              navigation.navigate("CategoryEdit")
            }}>
              <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

Category.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
}

export default withNavigation(Category);
