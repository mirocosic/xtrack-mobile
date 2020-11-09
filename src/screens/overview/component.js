import React, { Component } from "react"
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native"
import { DarkModeContext } from "react-native-dark-mode"
import { get } from "lodash"

import { Screen, Icon, Copy, Title } from "../../components"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import { calcAmount, calculateIncome, calculateExpenses } from "../../utils/helper-gnomes"
import palette from "../../utils/palette"
import styles from "./styles"


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

const sum = transactions => transactions.reduce((acc, transaction) => acc + calcAmount(transaction), 0)


class Overview extends Component {

  static contextType = DarkModeContext

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="tachometer-alt" />
    ),
  })

  sortByCategory = (expenses) => {
    const result = {}
    const { categories } = this.props
    expenses.forEach((expense) => {
      const category = categories.find(cat => cat.id === expense.categoryId)
      const currExpenseSum = result[category.name] || 0
      result[category.name] = currExpenseSum + calcAmount(expense)
    })

    return result
  }

  renderExpenses = expenses => (
    Object.entries(expenses)
      .sort((a, b) => b[1] - a[1])
      .map((item) => {
        const { categories } = this.props
        const cat = categories.find(c => c.name === item[0])
        return (
          <View key={item[0]} style={{ ...styles.row, paddingLeft: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                type={get(cat, "icon", "")}
                textStyle={{ color: cat.color || "blue", fontSize: 12 }}
                style={{ marginRight: 5, width: 20, height: 20 }}
              />
              <Copy style={{ fontSize: 14 }}>{`${item[0]} `} </Copy>

            </View>
            <Copy style={{ fontSize: 14 }}>

              {` ${formatCurrency(item[1])} `}
            </Copy>

          </View>
        )
      })
  )

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

        <ScrollView style={{ padding: 20, marginTop: 20 }} contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.inlineStart}>
            <Title>Net worth: </Title>
            <Copy style={{ fontWeight: "bold", fontSize: 20 }}>{formatCurrency(this.calculateNetWorth())}</Copy>
          </View>

          <View style={styles.inlineStart}>
            <Copy style={{ marginLeft: 5 }}>Savings Rate: </Copy>
            <Copy style={{ fontWeight: "bold", fontSize: 16 }}> {this.calcSavingsRate()}</Copy>
          </View>

          { accounts.map((acc) => {
            const income = parseFloat(calculateIncome(transactions, { type: "account", value: acc }))
            const expenses = parseFloat(calculateExpenses(transactions, { type: "account", value: acc }))
            const startingBalance = acc.startingBalance ? parseFloat(acc.startingBalance) : 0

            return (
              <View key={acc.id} style={[styles.accountWrap, darkMode && styles.accountWrapDark]}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View>
                    <Copy style={{ fontWeight: "bold", fontSize: 22, paddingBottom: 5 }}>{acc.name}</Copy>
                    <Icon type={acc.icon} textStyle={{ fontSize: 30, color: palette.darkBlue }} />
                  </View>

                  <View>
                    <Copy style={{ fontSize: 20, color: palette.green, textAlign: "right" }}>+{formatCurrency(income, acc.currency)}</Copy>
                    <Copy style={{ marginVertical: 5, fontSize: 20, color: palette.red, textAlign: "right" }}>-{formatCurrency(expenses, acc.currency)}</Copy>
                    <Copy style={{ fontSize: 20, color: palette.blue, textAlign: "right" }}>{formatCurrency(startingBalance + income - expenses, acc.currency)}</Copy>
                  </View>

                </View>


              </View>
            )
          })}


          <Title style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>All time breakdown</Title>


          <View style={[styles.inlineBetween, { marginBottom: 10 }]}>
            <Copy style={{ fontSize: 18 }}>Income: </Copy>
            <Copy style={{ fontSize: 18, color: palette.green }}>{formatCurrency(sum(transactions.filter(t => t.type === "income")))}</Copy>
          </View>

          { this.renderExpenses(this.sortByCategory(transactions.filter(t => t.type === "income")))}

          <View style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}>
            <Copy style={{ fontSize: 18 }}>Expenses: </Copy>
            <Copy style={{ fontSize: 18, color: palette.red }}>{formatCurrency(sum(transactions.filter(t => t.type === "expense")))}</Copy>
          </View>

          { this.renderExpenses(this.sortByCategory(transactions.filter(t => t.type === "expense")))}

        </ScrollView>
      </Screen>

    )
  }
}

export default Overview
