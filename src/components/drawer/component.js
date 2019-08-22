import React, { Component } from "react"
import { Alert, View, Text, TouchableOpacity } from "react-native"
import RNDrawer from "react-native-drawer"
import Icon from "../icon"
import { Title, Copy } from "../typography"
import __ from "../../utils/translations"
import styles from "./styles"

export default class Drawer extends Component {

  changeAccountFilter = () => {
    const { accounts, changeAccountFilter } = this.props
    Alert.alert(
      __("Select account"),
      __("Please choose account"),
      [
        ...accounts.map(account => (
          { text: account.name, onPress: () => changeAccountFilter(account) }
        )),
        { text: "All accounts", onPress: () => changeAccountFilter(false) },
      ],
    )
  }

  changeCategoryFilter = () => {
    const { categories, changeCategoryFilter } = this.props
    Alert.alert(
      __("Select category"),
      __("Please choose category"),
      [
        ...categories.map(cat => (
          { text: cat.name, onPress: () => changeCategoryFilter(cat) }
        )),
        { text: "All categories", onPress: () => changeCategoryFilter(false) },
      ],
    )
  }

  renderDrawerContent = (content) => {
    return (
      <View style={styles.content}>
        <Text>Filters</Text>
        <TouchableOpacity onPress={() => this.props.closeDrawer()}>
          <Text>Close 2</Text>
          <Text>Close 2</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {
      drawerOpen, drawerIsCanceled, drawerContent, applyFilters, applyMessageFilter,
      accountFilter, categoryFilter, closeDrawer, side, children,
    } = this.props;

    return (
      <RNDrawer
        ref={ref => this._drawer = ref}
        open={drawerOpen}
        side={side || "left"}
        tapToClose={true}
        onClose={() => {
          //drawerIsCanceled ? this.cancelAction(drawerContent) : this.applyAction(drawerContent)
          closeDrawer();
        }}
        openDrawerOffset={50}
        content={
          (
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Title>Filters</Title>
                <TouchableOpacity onPress={() => closeDrawer()}>
                  <Icon type="times" style={{ backgroundColor: "white" }} textStyle={{ color: "black" }} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={this.changeAccountFilter}>
                <Copy>Account: {accountFilter.name || "All accounts"}</Copy>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.changeCategoryFilter}>
                <Copy>Category: {categoryFilter.name || "All categories"}</Copy>
              </TouchableOpacity>

            </View>
        )
        }
        type="overlay"
        tweenDuration={500}
        tweenEasing="easeInOutQuart"
        tweenHandler={ratio => ({ mainOverlay: { opacity: ratio * 0.8 } })}
        styles={{ mainOverlay: { backgroundColor: "teal", opacity: 0 } }}
      >
        {children}
      </RNDrawer>
    )
  }
}
