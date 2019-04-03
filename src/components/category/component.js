import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native"
import Swipeout from "react-native-swipeout"
import { withNavigation } from "react-navigation";
import { get } from "lodash"
import Icon from "../icon"
import { Copy, Title } from "../typography"

import styles from "./styles"

class Category extends Component {

  countTransactions = catId => (
    this.props.transactions.filter((transaction)=> get(transaction, "category.id") === catId).length
  )

  renderDeleteButton = () => (
    <View style={styles.deleteButton}>
      <Icon style={{ backgroundColor: "red" }} />
      <Copy style={{ color: "white" }}>Delete</Copy>
    </View>
  );

  renderEditButton = () => (
    <View style={styles.editButton}>
      <Icon style={{ backgroundColor: "blue" }} />
      <Copy style={{ color: "white" }}>Edit</Copy>
    </View>
  )

  render() {
    const cat = this.props.data
    return (
      <Swipeout
        right={[{
          backgroundColor: "#f8f8fc",
          component: this.renderDeleteButton(),
        },
        {
          backgroundColor: "blue",
          component: this.renderEditButton(),
        }]}
        style={{ borderBottomWidth: 1, borderColor: "gray" }}
        sensitivity={10}
        buttonWidth={70}
        backgroundColor="#f8f8fc">

        <TouchableOpacity
          key={cat.id}
          onPress={this.props.onPress}>

          <View key={cat.id} style={[styles.categoryWrap, this.props.darkMode && styles.catWrapDark]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon type={cat.icon} style={{ marginRight: 10, backgroundColor: get(cat, "color", "blue") }} />
              <Copy>{cat.name + " ("+this.countTransactions(cat.id)+")"}</Copy>
            </View>

            <TouchableOpacity onPress={() => {
              this.props.selectCategory(cat)
              this.props.navigation.navigate("CategoryEdit")
            }}>
              <Title>{">"}</Title>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

export default withNavigation(Category);
