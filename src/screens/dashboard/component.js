import React, { Component } from "react"
import { Animated, View, ScrollView, TouchableOpacity, Alert } from "react-native"

import { withNavigation } from "react-navigation"
import { get } from "lodash"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import AddTransaction from "../../components/add-transaction"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from "../../utils/ui-utils"

class Dashboard extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="tasks" />
    ),
  })

  state = {
    height: new Animated.Value(0),
  }

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
    if (transactions.length === 0) return 0;
    const accountTransactions = transactions.filter(item => account.id === get(item, "account.id") && item.type === "expense")
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));

    return total.amount;
  }

  calcIncome = (account) => {
    const { transactions } = this.props
    if (transactions.length === 0) return 0;
    const accountTransactions = transactions.filter((item)=>account.id=== get(item ,"account.id") && item.type === "income");
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b)=>({amount: parseFloat(a.amount) + parseFloat(b.amount)}));

    return total.amount;
  }

  calcTotal = (account) => {
    const { transactions } = this.props
    if (transactions.length === 0) return 0;
    const accountTransactions = transactions.filter(item => account.id === get(item, "account.id"));
    if (accountTransactions.length === 0) { return 0 }
    const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));

    return total.amount;
  }

  render() {

    const {
      clearSelectedCategory, clearTransactionForm, navigation, accounts, darkMode,
      expenses, income, total,
    } = this.props
    const { height } = this.state

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
        }}
        >
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
            <Title>All accounts</Title>
            <View style={styles.accountDetails}>
              <Copy>{__("Expenses")}: { formatCurrency(expenses)}</Copy>
              <Copy>{__("Income")}: { formatCurrency(income)}</Copy>
              <Copy>{__("Total")}: { formatCurrency(total)}</Copy>
            </View>
          </View>

        </ScrollView>

        <AddTransaction />

      </Screen>
    )
  }
}

export default withNavigation(Dashboard);
