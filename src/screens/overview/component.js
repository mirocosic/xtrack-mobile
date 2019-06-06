import React, { Component } from "react"
import { View, Text } from "react-native"

import { withNavigation } from "react-navigation"
import Screen from "../../components/screen"
import Header from "../../components/header"

import AddTransaction from "../../components/add-transaction"
import styles from "./styles"


class Overview extends Component {

  state = {}

  renderExpenses() {
    return Object.entries(this.props.expensesByCategory).map(item => (
      <View style={{ ...styles.row, paddingLeft: 20 }}>
        <Text>{item[0]}</Text>
        <Text>{item[1]}</Text>
      </View>
    ))
  }

  render() {

    const { expensesByCategory } = this.props

    console.log(expensesByCategory)

    return (
      <Screen>
        <Header title="Overview" />
        <View style={styles.wrap}>
          <View style={styles.row}>
            <Text>Income</Text>
            <Text>1000 kn</Text>
          </View>

          <View style={styles.row}>
            <Text>Expenses</Text>
            <Text>500 kn</Text>
          </View>

          <View style={styles.breakdownWrap}>
            { this.renderExpenses() }
          </View>

          <View style={styles.row}>
            <Text>Balance</Text>
            <Text>10000</Text>
          </View>


        </View>

        <AddTransaction />
      </Screen>
    )
  }
}

export default withNavigation(Overview)
