import React, { Component } from "react"
import { View, Text } from "react-native"

import { withNavigation } from "react-navigation"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import AddTransaction from "../../components/add-transaction"
import styles from "./styles"

import { calculateIncome, calculateExpenses } from "../../utils/helper-gnomes"

class Overview extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="tachometer-alt" />
    ),
  })

  state = {}

  renderExpenses() {
    return Object.entries(this.props.expensesByCategory).map((item, idx) => (
      <View key={idx} style={{ ...styles.row, paddingLeft: 20 }}>
        <Text>{`${item[0]} `}</Text>
        <Text>{`${item[1]} kn`}</Text>
      </View>
    ))
  }

  render() {
    const { expensesByCategory, transactions, expenses } = this.props

    return (
      <Screen>
        <Header title="Overview" />
        <View style={styles.wrap}>
          <View style={styles.row}>
            <Text>Income </Text>
            <Text>{calculateIncome(transactions)} kn</Text>
          </View>

          <View style={styles.row}>
            <Text>Expenses </Text>
            <Text>{calculateExpenses(transactions)} kn</Text>
          </View>

          <View style={styles.breakdownWrap}>
            { this.renderExpenses() }
          </View>

          <View style={styles.row}>
            <Text>Balance </Text>
            <Text>{calculateIncome(transactions) - calculateExpenses(transactions)} kn</Text>
          </View>


        </View>

        <AddTransaction />
      </Screen>
    )
  }
}

export default withNavigation(Overview)
