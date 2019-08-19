import React, { Component } from "react"
import { Animated, View, ScrollView, TouchableOpacity, Alert, Dimensions } from "react-native"

import { withNavigation } from "react-navigation"
import { get } from "lodash"
import moment from "moment"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import AddTransaction from "../../components/add-transaction"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from "../../utils/ui-utils"

const months = [1,2,3,4,5,6,7,8,9,0,1,2,3]

const sum = transactions => transactions.reduce((acc, transaction) => acc + transaction.amount, 0)

const filterByMonth = (transactions, currentMonth) => (
  transactions.filter(t => moment(t.timestamp) > currentMonth.startOf("month")
                           && moment(t.timestamp) < currentMonth.endOf("month")
                           && t.type === "expense"))

const sortByCategory = (expenses) => {
  const result = {}
  expenses.map((expense) => {
    const currExpenseSum = result[expense.category.name] || 0
    result[expense.category.name] = currExpenseSum + expense.amount
})

 return result
}

class Dashboard extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="tasks" />
    ),
  })

  state = {
    height: new Animated.Value(0),
  }


  componentDidMount() {
    setTimeout(() => this.scrollView.scrollToEnd({ animated: false }), 100)
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

  renderExpenses(expenses) {
    return Object.entries(expenses).map((item, idx) => (
      <View key={idx} style={{ ...styles.row, paddingLeft: 20 }}>
        <Copy>{`${item[0]} `}</Copy>
        <Copy>{`${item[1]} kn`}</Copy>
      </View>
    ))
  }

  render() {

    const currentMonth = moment(this.props.currentMonth)

    currentMonth.subtract(12, "month")

    const {
      clearSelectedCategory, clearTransactionForm, navigation, accounts, darkMode,
      expenses, income, total, transactions
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
        <Header title="Dashboard" />

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          ref={ref => this.scrollView = ref}
          showsHorizontalScrollIndicator={false}>

          { months.map((item, idx) => {
            currentMonth.add(1, "month")
            const expenses = sortByCategory(filterByMonth(transactions.filter(item => item.type === "expense"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(item => item.type === "income"), currentMonth))
            return (
              <ScrollView key={idx} style={styles.monthContainer}>
                <Title style={{textAlign: "center"}}>{moment(currentMonth, "YYYY-MM-DD").format("MMMM")}</Title>
                <View style={{flexDirection: "row", marginBottom: 10}}>
                  <Copy>Income: </Copy>
                  <Copy>{income}</Copy>
                </View>

                <Copy>Expenses: </Copy>

                {this.renderExpenses(expenses)}

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Copy>Balance: </Copy>
                  <Copy>{income}</Copy>
                </View>

              </ScrollView>
            )

          })}

        </ScrollView>

      </Screen>
    )
  }
}

export default withNavigation(Dashboard);
