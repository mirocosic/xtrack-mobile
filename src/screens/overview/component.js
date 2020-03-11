import React, { Component } from "react"
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native"
import { withNavigation } from "react-navigation"
import { DarkModeContext } from "react-native-dark-mode"

import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

import { calculateIncome, calculateExpenses } from "../../utils/helper-gnomes"

const calcStartingBalance = (account) => {
  switch (account.currency) {
    case "EUR":
      return 7.55 * parseFloat(account.startingBalance)
    case "USD":
      return 6.66 * parseFloat(account.startingBalance)
    default:
      return parseFloat(account.startingBalance)
  }
}


class Overview extends Component {

  static contextType = DarkModeContext

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="tachometer-alt" />
    ),
  })

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

  renderAccounts = (callback) => {
    const { accounts, changeAccountFilter } = this.props
    return accounts.map(account => (
      <TouchableOpacity key={account.id} onPress={() => { changeAccountFilter(account); callback() }}>
        <Text>{account.name}</Text>
      </TouchableOpacity>
    ))
  }

  calculateNetWorth = () => {
    const { transactions, accounts } = this.props
    let netWorth = 0

    accounts.forEach((acc) => {
      const income = parseFloat(calculateIncome(transactions, { type: "account", value: acc }, true))
      const expenses = parseFloat(calculateExpenses(transactions, { type: "account", value: acc }, true))
      const startingBalance = acc.startingBalance ? calcStartingBalance(acc) : 0
      netWorth = netWorth + startingBalance + income - expenses
    })

    return netWorth
  }

  calcSavingsRate = () => {
    const { transactions } = this.props
    const income = parseFloat(calculateIncome(transactions))
    const expenses = parseFloat(calculateExpenses(transactions))
    if (income === 0 || income < expenses) { return "0%" }
    const rate = (((income - expenses) / income) * 100).toFixed(2)
    let emoji = ""
    if (rate > 75) {
      emoji = "😃"
    } else if (rate > 50) {
      emoji = "🙂"
    } else if (rate > 20) {
      emoji = "😐"
    } else {
      emoji = "😟"
    }
    return `${rate}% ${emoji}`
  }

  renderExpenses() {
    const { expensesByCategory } = this.props
    return Object.entries(expensesByCategory).map(item => (
      <View key={item.id} style={{ ...styles.row, paddingLeft: 20 }}>
        <Text>{`${item[0]} `}</Text>
        <Text>{`${item[1]} kn`}</Text>
      </View>
    ))
  }

  render() {
    const { accounts, transactions } = this.props
    const darkMode = this.context === "dark"
    return (

      <Screen>
        <Header title="Overview" />
        <ScrollView style={{ padding: 20 }} contentContainerStyle={{ paddingBottom: 40 }}>
          <Title>Net worth: <Copy style={{ fontWeight: "bold", fontSize: 20 }}>{formatCurrency(this.calculateNetWorth())}</Copy></Title>
          <Copy style={{ marginLeft: 5 }}>Savings Rate:
            <Copy style={{ fontWeight: "bold", fontSize: 16 }}> {this.calcSavingsRate()}</Copy>
          </Copy>

          { accounts.map((acc) => {
            const income = parseFloat(calculateIncome(transactions, { type: "account", value: acc }))
            const expenses = parseFloat(calculateExpenses(transactions, { type: "account", value: acc }))
            const startingBalance = acc.startingBalance ? parseFloat(acc.startingBalance) : 0

            return (
              <View key={acc.id} style={[styles.accountWrap, darkMode && styles.accountWrapDark]}>
                <Copy style={{ fontWeight: "bold" }}>{acc.name}</Copy>
                <View>
                  { true && (
                    <View style={[styles.inline, { justifyContent: "space-between", paddingLeft: 20, paddingRight: 20 }]}>
                      <Copy>Starting Balance: </Copy>
                      <Copy>{formatCurrency(startingBalance, acc.currency)}</Copy>
                    </View>)
                  }

                  <View style={[styles.inline, { justifyContent: "space-between", paddingLeft: 20, paddingRight: 20 }]}>
                    <Copy>Income: </Copy>
                    <Copy>{formatCurrency(income, acc.currency)}</Copy>
                  </View>

                  <View style={[styles.inline, { justifyContent: "space-between", paddingLeft: 20, paddingRight: 20 }]}>
                    <Copy>Expenses: </Copy>
                    <Copy>{formatCurrency(expenses, acc.currency)}</Copy>
                  </View>

                  <View style={[styles.inline, { justifyContent: "space-between", paddingLeft: 20, paddingRight: 20 }]}>
                    <Copy>Balance: </Copy>
                    <Copy style={{ color: "blue" }}>{formatCurrency(startingBalance + income - expenses, acc.currency)}</Copy>
                  </View>
                </View>

              </View>
            )
          })}

        </ScrollView>
      </Screen>

    )
  }
}

export default withNavigation(Overview)
