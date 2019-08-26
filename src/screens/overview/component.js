import React, { Component } from "react"
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native"
import { withNavigation } from "react-navigation"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

import { calculateIncome, calculateExpenses } from "../../utils/helper-gnomes"

class Overview extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="tachometer-alt" />
    ),
  })

  state = { modalVisible: false }

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
    return accounts.map((account, idx) => (
      <TouchableOpacity key={idx} onPress={() => { changeAccountFilter(account); callback() }}>
        <Text>{account.name}</Text>
      </TouchableOpacity>

    ))
  }

  renderExpenses() {
    return Object.entries(this.props.expensesByCategory).map((item, idx) => (
      <View key={idx} style={{ ...styles.row, paddingLeft: 20 }}>
        <Text>{`${item[0]} `}</Text>
        <Text>{`${item[1]} kn`}</Text>
      </View>
    ))
  }

  calculateNetWorth = () => {
    const { transactions, accounts } = this.props
    let netWorth = 0

    accounts.forEach((acc) => {
      const income = parseFloat(calculateIncome(transactions, { type: "account", value: acc }))
      const expenses = parseFloat(calculateExpenses(transactions, { type: "account", value: acc }))

      netWorth = netWorth + income + expenses
    })

    return netWorth
  }

  render() {
    const { expensesByCategory, accounts, transactions, accountFilter, changeAccountFilter, changeMonthFilter, currentMonth } = this.props
    return (

      <Screen>
        <Header title="Overview" />
        <ScrollView style={{ padding: 20 }}>
          <Title>Net worth: {formatCurrency(this.calculateNetWorth())}</Title>

          { accounts.map((acc) => {
            const income = parseFloat(calculateIncome(transactions, { type: "account", value: acc }))
            const expenses = parseFloat(calculateExpenses(transactions, { type: "account", value: acc }))

            return (
              <View key={acc.id} style={styles.accountWrap}>
                <Copy style={{ fontWeight: "bold" }}>{acc.name}</Copy>
                <View>
                  <View style={[styles.inline,{justifyContent: "space-between", paddingLeft: 20, paddingRight: 20}]}>
                    <Copy>Income: </Copy>
                    <Copy>{formatCurrency(income)}</Copy>
                  </View>

                  <View style={[styles.inline,{justifyContent: "space-between", paddingLeft: 20, paddingRight: 20}]}>
                    <Copy>Expenses: </Copy>
                    <Copy>{formatCurrency(expenses)}</Copy>
                  </View>

                  <View style={[styles.inline,{justifyContent: "space-between", paddingLeft: 20, paddingRight: 20}]}>
                    <Copy>Balance: </Copy>
                    <Copy>{ formatCurrency(income + expenses)}</Copy>
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
