import React, { Component } from "react"
import { View, ScrollView, Alert, Dimensions } from "react-native"
import { withNavigation } from "react-navigation"
import { get } from "lodash"
import moment from "moment"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

const months = Array(24).fill(1)
const futureMonths = Array(12).fill(1)

const sum = transactions => transactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)

const filterByMonth = (transactions, currentMonth) => (
  transactions.filter(t => moment(t.timestamp) > currentMonth.startOf("month")
                           && moment(t.timestamp) < currentMonth.endOf("month")))

const sortByCategory = (expenses) => {
  const result = {}
  expenses.map((expense) => {
    const currExpenseSum = result[expense.category.name] || 0
    result[expense.category.name] = currExpenseSum + parseFloat(expense.amount)
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
    showScrollToEnd: false,
    showScrollToStart: false,
    year: moment().format("YYYY"),
  }


  componentDidMount() {
    const { width } = Dimensions.get("window")
    this.props.openOnForm && this.props.navigation.navigate("TransactionForm")
    setTimeout(() => this.scrollView.scrollTo({ x: width * 23, y: 0, animated: false }), 100)
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

  handleScroll = (event) => {
    const { width } = Dimensions.get("window")
    console.log(event.nativeEvent.contentOffset.x)
    if (event.nativeEvent.contentOffset.x < width * 24) {
      this.setState({ showScrollToEnd: true, showScrollToStart: false })
    } else if (event.nativeEvent.contentOffset.x > width * 24) {
      this.setState({ showScrollToEnd: false, showScrollToStart: true })
    } else {
      this.setState({ showScrollToEnd: false, showScrollToStart: false })
    }
    const screenNum = Math.round(24 - (event.nativeEvent.contentOffset.x / width))
    this.setState({ year: moment().subtract(screenNum, "month").format("YYYY") })
  }

  renderExpenses(expenses) {
    return Object.entries(expenses).map((item, idx) => (
      <View key={idx} style={{ ...styles.row, paddingLeft: 20 }}>
        <Copy style={{fontSize: 14}}>{`${item[0]} `}</Copy>
        <Copy style={{fontSize: 14}}>{`${formatCurrency(item[1])}`}</Copy>
      </View>
    ))
  }

  renderActionBtn = () => {
    if (this.state.showScrollToEnd) {
      return (
        <View style={styles.inline}>
          <Copy style={{ color: "white", fontSize: 14 }}>Now</Copy>
          <Icon type="chevronRight" style={{ marginLeft: -10 }} textStyle={{ fontSize: 12 }} />
        </View>
      )
    }

    if (this.state.showScrollToStart) {
      return (
        <View style={styles.inlineAround}>
          <Icon type="chevronLeft" style={{ marginLeft: 20 }} textStyle={{ fontSize: 12 }} />
          <Copy style={{ color: "white", fontSize: 14 }}>Now</Copy>
        </View>
      )
    }

    return (null)
  }

  render() {
    const {
      clearSelectedCategory, clearTransactionForm, navigation, accounts, darkMode,
      total, transactions,
    } = this.props

    const { width } = Dimensions.get("window")
    const currentMonth = moment(this.props.currentMonth)
    currentMonth.subtract(24, "month")

    return (
      <Screen>
        <Header
          title={this.state.year}
          actionBtn={this.renderActionBtn()}
          actionBtnPress={() => this.scrollView.scrollTo({ x: width * 23, animated: true })}
        />

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          ref={ref => this.scrollView = ref}
          onScroll={this.handleScroll}
          showsHorizontalScrollIndicator={false}>

          { months.map((item) => {
            currentMonth.add(1, "month")
            const sortedExpenses = sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))
            const sortedIncome = sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))

            return (
              <ScrollView key={item.id} style={styles.monthContainer}>
                <Title style={{ textAlign: "center", paddingBottom: 20 }}>
                  {moment(currentMonth, "YYYY-MM-DD").format("MMMM")}
                </Title>

                <View style={[styles.inlineBetween, { marginBottom: 10 }]}>
                  <Copy>Income: </Copy>
                  <Copy>{formatCurrency(income)}</Copy>
                </View>

                {this.renderExpenses(sortedIncome)}


                <View style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}>
                  <Copy>Expenses: </Copy>
                  <Copy>{formatCurrency(expenses)}</Copy>
                </View>

                {this.renderExpenses(sortedExpenses)}

                <View style={[styles.inlineBetween, { marginTop: 30, paddingTop: 10, borderTopWidth: 1 }]}>
                  <Copy>Balance: </Copy>
                  <Copy>{formatCurrency(income - expenses)}</Copy>
                </View>

              </ScrollView>
            )

          })}

          {futureMonths.map((item) => {
            currentMonth.add(1, "month")
            const sortedExpenses = sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))
            const sortedIncome = sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))

            return (
              <ScrollView key={item.id} style={styles.monthContainer}>
                <Title style={{ textAlign: "center", paddingBottom: 20 }}>
                  {moment(currentMonth, "YYYY-MM-DD").format("MMMM")}
                </Title>

                <View style={[styles.inlineBetween, { marginBottom: 10 }]}>
                  <Copy>Income: </Copy>
                  <Copy>{formatCurrency(income)}</Copy>
                </View>

                {this.renderExpenses(sortedIncome)}


                <View style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}>
                  <Copy>Expenses: </Copy>
                  <Copy>{formatCurrency(expenses)}</Copy>
                </View>

                {this.renderExpenses(sortedExpenses)}

                <View style={[styles.inlineBetween, { marginTop: 30, paddingTop: 10, borderTopWidth: 1 }]}>
                  <Copy>Balance: </Copy>
                  <Copy>{formatCurrency(income - expenses)}</Copy>
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
