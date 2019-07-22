import React, { Component } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { withNavigation } from "react-navigation"
import moment from "moment"
import Modal from "react-native-modal"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import { Copy, Title } from "../../components/typography"
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

  render() {
    const { expensesByCategory, transactions, accountFilter, changeAccountFilter, changeMonthFilter, currentMonth } = this.props
    const income = calculateIncome(transactions, { type: "account", value: accountFilter })
    const expenses = calculateExpenses(transactions, { type: "account", value: accountFilter })
    const total = income - expenses
    return (

      <Screen>
        <Header title="Overview" />

        <View style={styles.rangeSelector}>
          <TouchableOpacity onPress={() => changeMonthFilter(moment(currentMonth).subtract(1, "month").format("YYYY-MM-DD"))}>
            <Icon style={{ backgroundColor: "teal" }} textStyle={{ fontSize: 20, color: "white" }} type="angle-left" />
          </TouchableOpacity>

          <Title>{moment(currentMonth, "YYYY-MM-DD").format("MMMM")}</Title>
          <TouchableOpacity onPress={() => changeMonthFilter(moment(currentMonth).add(1, "month").format("YYYY-MM-DD"))}>
            <Icon style={{ backgroundColor: "teal" }} textStyle={{ fontSize: 20, color: "white" }} type="angle-right" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={
            () => this.setState({ modalVisible: true })
            // this.changeAccountFilter
          }>
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

        <Modal
          style={{ margin: 0, justifyContent: "flex-end" }}
          swipeDirection={["up", "down"]}
          onSwipeComplete={() => this.setState({ modalVisible: false })}
          onBackdropPress={() => this.setState({ modalVisible: false })}
          isVisible={this.state.modalVisible}>
          <View style={{ height: 200, width: "100%", padding: 20, backgroundColor: "white" }}>
            <Text style={{ textAlign: "center" }}>Select account</Text>

            <View>{this.renderAccounts(() => this.setState({ modalVisible: false }))}</View>

            <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }); changeAccountFilter(false) }}>
              <Text>All accounts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ position: "absolute", right: 10, padding: 5}}
              onPress={() => this.setState({ modalVisible: false })}>
              <Title>x</Title>
            </TouchableOpacity>

          </View>
        </Modal>
      </Screen>

    )
  }
}

export default withNavigation(Overview)
