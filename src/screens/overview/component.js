import React, { Component } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"

import { withNavigation } from "react-navigation"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import { Copy } from "../../components/typography"
import AddTransaction from "../../components/add-transaction"
import __ from "../../utils/translations"
import styles from "./styles"

import { calculateIncome, calculateExpenses } from "../../utils/helper-gnomes"

class Overview extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="tachometer-alt" />
    ),
  })

  state = {}

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

  renderExpenses() {
    return Object.entries(this.props.expensesByCategory).map((item, idx) => (
      <View key={idx} style={{ ...styles.row, paddingLeft: 20 }}>
        <Text>{`${item[0]} `}</Text>
        <Text>{`${item[1]} kn`}</Text>
      </View>
    ))
  }

  render() {
    const { expensesByCategory, transactions, accountFilter } = this.props
    const income = calculateIncome(transactions, { type: "account", value: accountFilter })
    const expenses = calculateExpenses(transactions, { type: "account", value: accountFilter })
    const total = income - expenses
    return (
      <Screen>
        <Header title="Overview" />

        <TouchableOpacity onPress={this.changeAccountFilter}>
          <Copy style={{ color: "black" }}>Account: {accountFilter.name || "All accounts"}</Copy>
        </TouchableOpacity>

        <View style={styles.wrap}>
          <View style={styles.row}>
            <Text>Income </Text>
            <Text>{income} kn</Text>
          </View>

          <View style={styles.row}>
            <Text>Expenses </Text>
            <Text>{expenses} kn</Text>
          </View>

          <View style={styles.breakdownWrap}>
            { this.renderExpenses() }
          </View>

          <View style={styles.row}>
            <Text>Balance </Text>
            <Text>{total} kn</Text>
          </View>


        </View>

        <AddTransaction />
      </Screen>
    )
  }
}

export default withNavigation(Overview)
