import React, { Component } from "react"
import { Alert, Animated, View, ScrollView, TouchableOpacity } from "react-native"
import { get } from "lodash"

import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import palette from "../../utils/palette"

import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from "../../utils/ui-utils"

import styles from "./styles"

class Reports extends Component {

  static navigationOptions = ({ navigation }) => ({
    tabBarOnPress: () => {
      navigation.navigate("TransactionForm", { clearForm: true })
    },
    tabBarIcon: () => (
      <Icon
        style={{ backgroundColor: palette.blue, height: 50, width: 50, bottom: 10, borderRadius: 50 }}
        textStyle={{ fontSize: 30, color: "white" }}
        type="plus"
      />
    ),
  })

  state = { height: new Animated.Value(0) }

  changeAccountFilter = () => {
    const { accounts, changeAccountFilter } = this.props
    Alert.alert(
      __("Select account"),
      __("Please choose account"),
      accounts.map(account => (
        { text: account.name, onPress: () => changeAccountFilter(account) }
      )),

    )
  }

  calcExpenses = (account) => {
    const { transactions } = this.props
    if (transactions.length === 0) return 0
    const accountTransactions = transactions.filter(item => account.id === get(item, "account.id") && item.type === "expense")
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }))

    return total.amount
  }

  calcIncome = (account) => {
    const { transactions } = this.props
    if (transactions.length === 0) return 0
    const accountTransactions = transactions.filter(item => account.id === get(item, "account.id") && item.type === "income")
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }))

    return total.amount
  }

  calcTotal = (account) => {
    const { transactions } = this.props
    if (transactions.length === 0) return 0;
    const accountTransactions = transactions.filter(item => account.id === get(item, "account.id"))
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }))

    return total.amount
  }

  render() {
    const { height } = this.state
    const { accounts, darkMode, expenses, income, total, navigation, clearSelectedCategory, clearTransactionForm } = this.props
    const headerHeight = height.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    const headerScale = height.interpolate({
      inputRange: [-150, 0],
      outputRange: [3, 1],
      extrapolate: "clamp",
    });

    return (
      <Screen>
        <Animated.View style={{
          justifyContent: "center",
          overflow: "hidden",
          transform: [{ scale: headerScale }],
          height: headerHeight,
          backgroundColor: "teal",
        }}>
          <Header title="Dashboard" />
        </Animated.View>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: height } } }])}>

          { accounts.map(account => (
            <View key={account.id} style={[styles.accountCard, darkMode && styles.accountCardDark]}>
              <Title>{account.name}</Title>
              <View style={styles.accountDetails}>
                <Copy>{__("Expenses")}: { formatCurrency(this.calcExpenses(account))}</Copy>
                <Copy>{__("Income")}: { formatCurrency(this.calcIncome(account))}</Copy>
                <Copy>{__("Total")}: { formatCurrency(this.calcTotal(account))}</Copy>
              </View>
            </View>
          ))}

          <View style={[styles.accountCard, darkMode && styles.accountCardDark]}>
            <Title>`All accounts`</Title>
            <View style={styles.accountDetails}>
              <Copy>{__("Expenses")}: { formatCurrency(expenses)}</Copy>
              <Copy>{__("Income")}: { formatCurrency(income)}</Copy>
              <Copy>{__("Total")}: { formatCurrency(total)}</Copy>
            </View>
          </View>

        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TransactionForm")
            clearSelectedCategory()
            clearTransactionForm()
          }}
          style={styles.addButton}>
          <Icon
            style={{ backgroundColor: "teal", width: 50, height: 50, borderRadius: 25 }}
            textStyle={{ fontSize: 30 }}
            type="plus" />
        </TouchableOpacity>

      </Screen>
    )
  }
}

export default Reports
