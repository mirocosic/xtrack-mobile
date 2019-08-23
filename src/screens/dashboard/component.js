import React, { Component } from "react"
import { Animated, View, ScrollView, Alert, Dimensions } from "react-native"
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

import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from "../../utils/ui-utils"

const months = [1,2,3,4,5,6,7,8,9,0,1,2,1,2,3,4,5,6,7,8,9,0,1,2]

const sum = transactions => transactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)

const filterByMonth = (transactions, currentMonth) => (
  transactions.filter(t => moment(t.timestamp) > currentMonth.startOf("month")
                           && moment(t.timestamp) < currentMonth.endOf("month")))

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
    showScrollToEnd: false,
    year: moment().format("YYYY")
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
        <Copy style={{fontSize: 14}}>{`${item[0]} `}</Copy>
        <Copy style={{fontSize: 14}}>{`${formatCurrency(item[1])}`}</Copy>
      </View>
    ))
  }

  handleScroll = (event) => {
    const { width } = Dimensions.get("window")
    if (event.nativeEvent.contentOffset.x <= width * 22) {
      this.setState({ showScrollToEnd: true })
    } else {
      this.setState({ showScrollToEnd: false })
    }

    //this.setState({ title: moment(currentMonth, "YYYY-MM-DD").format("YYYY") })
    //console.log( moment(currentMonth, "YYYY-MM-DD").format("YYYY") )

    //console.log("Screen #: ", 23 - (event.nativeEvent.contentOffset.x / width))
    const screenNum = Math.round(23 - (event.nativeEvent.contentOffset.x / width))
    console.log("Screen num: ",screenNum)
    console.log()

    this.setState({ year: moment().subtract(screenNum, "month").format("YYYY") })

  }

  render() {
    const {
      clearSelectedCategory, clearTransactionForm, navigation, accounts, darkMode,
      total, transactions
    } = this.props

    const currentMonth = moment(this.props.currentMonth)
    currentMonth.subtract(24, "month")

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
        <Header title={this.state.year} actionBtn={ this.state.showScrollToEnd && <View style={styles.inline}><Copy style={{color: "white", fontSize: 14}}>Now</Copy><Icon type="chevronRight" style={{marginLeft: -10}} textStyle={{fontSize: 12}}/></View>} actionBtnPress={() => this.scrollView.scrollToEnd({ animated: true })}/>

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          ref={ref => this.scrollView = ref}
          onScroll={this.handleScroll}

          showsHorizontalScrollIndicator={false}>

          { months.map((item, idx) => {
            currentMonth.add(1, "month")
            const sortedExpenses = sortByCategory(filterByMonth(transactions.filter(item => item.type === "expense"), currentMonth))
            const sortedIncome = sortByCategory(filterByMonth(transactions.filter(item => item.type === "income"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(item => item.type === "income"), currentMonth))
            const expenses = sum(filterByMonth(transactions.filter(item => item.type === "expense"), currentMonth))



            return (
              <ScrollView key={idx} style={styles.monthContainer}>
                <Title style={{ textAlign: "center", paddingBottom: 20 }}>
                  {moment(currentMonth, "YYYY-MM-DD").format("MMMM")}
                </Title>

                <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
                  <Copy>Income: </Copy>
                  <Copy>{formatCurrency(income)}</Copy>
                </View>

                {this.renderExpenses(sortedIncome)}


                <View style={{ flexDirection: "row", marginBottom: 10, paddingTop: 20, justifyContent: "space-between" }}>
                  <Copy>Expenses: </Copy>
                  <Copy>{formatCurrency(expenses)}</Copy>
                </View>

                {this.renderExpenses(sortedExpenses)}

                <View style={{ flexDirection: "row", marginTop: 30, paddingTop: 10, justifyContent: "space-between", borderTopWidth: 1 }}>
                  <Copy>Balance: </Copy>
                  <Copy>{formatCurrency(income + expenses)}</Copy>
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
