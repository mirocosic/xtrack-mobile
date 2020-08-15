import React, { Component } from "react"
import { View, ScrollView, Alert, Dimensions, StatusBar } from "react-native"
import { get } from "lodash"
import moment from "moment"
import SplashScreen from "react-native-splash-screen"

import { Screen, Icon, Copy, Title } from "../../components"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import palette from "../../utils/palette"
import { calcAmount } from "../../utils/helper-gnomes"
import { isIos } from "../../utils/os-utils"
import styles from "./styles"

const months = Array(24).fill(1)
const futureMonths = Array(12).fill(1)

const sum = transactions => transactions.reduce((acc, transaction) => acc + calcAmount(transaction), 0)

const filterByMonth = (transactions, currentMonth) => (
  transactions.filter(t => moment(t.timestamp) > currentMonth.startOf("month")
                           && moment(t.timestamp) < currentMonth.endOf("month")))

const renderBudget = (value, budget) => {
  const result = Math.round((value / budget) * 100)
  let color = false
  if (result >= 100) { color = palette.red } else if (result >= 80) { color = palette.orange } else { color = false }
  return budget && budget > 0 && <Copy style={{ fontSize: 12, color }}>({result}%)</Copy>
}

class Dashboard extends Component {

  state = {
    showScrollToEnd: false,
    showScrollToStart: false,
  }

  componentDidMount() {
    const { navigation, openOnForm } = this.props
    const { width } = Dimensions.get("window")
    SplashScreen.hide()
    !isIos && StatusBar.setBackgroundColor(palette.blue)
    openOnForm && navigation.navigate("TransactionForm", { clearForm: true })
    setTimeout(() => this.scrollView.scrollTo({ x: width * 23, y: 0, animated: false }), 100)
  }

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

  calcSavingsRate = (income, expenses) => {
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

  handleScroll = (event) => {
    const { width } = Dimensions.get("window")
    if (event.nativeEvent.contentOffset.x < width * 23) {
      this.setState({ showScrollToEnd: true, showScrollToStart: false })
    } else if (event.nativeEvent.contentOffset.x > width * 23) {
      this.setState({ showScrollToEnd: false, showScrollToStart: true })
    } else {
      this.setState({ showScrollToEnd: false, showScrollToStart: false })
    }
    // const screenNum = Math.round(23 - (event.nativeEvent.contentOffset.x / width))
    // this.setState({ title: moment().subtract(screenNum, "month").format("MMMM") })
  }

  renderExpenses = expenses => (
    Object.entries(expenses)
      .sort((a, b) => b[1] - a[1])
      .map((item, idx) => {
        const { categories } = this.props
        const cat = categories.find(c => c.name === item[0])
        return (
          <View key={idx} style={{ ...styles.row, paddingLeft: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon type={get(cat, "icon", "")} textStyle={{ color: cat.color || "blue", fontSize: 12 }} style={{ marginRight: 5, width: 20, height: 20 }} />
              <Copy style={{ fontSize: 14 }}>{`${item[0]} `} { renderBudget(item[1], cat.budget) } </Copy>

            </View>
            <Copy style={{ fontSize: 14 }}>

              {` ${formatCurrency(item[1])} `}
            </Copy>

          </View>
        )
      })
  )

  renderActionBtn = () => {
    const { showScrollToEnd, showScrollToStart } = this.state
    if (showScrollToEnd) {
      return (
        <View style={styles.inline}>
          <Copy style={{ color: "white", fontSize: 14 }}>Now</Copy>
          <Icon type="chevronRight" style={{ marginLeft: -10 }} textStyle={{ fontSize: 12 }} />
        </View>
      )
    }

    if (showScrollToStart) {
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
    const { transactions } = this.props
    const currentMonth = moment()
    currentMonth.subtract(24, "month")

    return (
      <Screen>

        <ScrollView
          horizontal
          pagingEnabled
          ref={ref => this.scrollView = ref}
          showsHorizontalScrollIndicator={false}>

          { months.map((item, idx) => {
            currentMonth.add(1, "month")
            const sortedExpenses = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))
            const sortedIncome = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))

            return (
              <ScrollView key={idx} style={styles.monthContainer}>

                <View style={[styles.inlineAround, { margin: 15 }]}>
                  <Title>{currentMonth.format("MMMM YYYY")}</Title>
                </View>

                <View style={[styles.inlineBetween, { marginBottom: 10 }]}>
                  <Copy style={{ fontSize: 18 }}>Income: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.green }}>{formatCurrency(income)}</Copy>
                </View>

                {this.renderExpenses(sortedIncome)}


                <View style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}>
                  <Copy style={{ fontSize: 18 }}>Expenses: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.red }}>{formatCurrency(expenses)}</Copy>
                </View>

                {this.renderExpenses(sortedExpenses)}

                <View style={[styles.inlineBetween, { marginTop: 30, paddingTop: 10, borderTopWidth: 1 }]}>
                  <Copy style={{ fontSize: 18 }}>Balance: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.blue }}>{formatCurrency(income - expenses)}</Copy>
                </View>

                <View style={[styles.inlineBetween, styles.alignCenter]}>
                  <Copy style={{ fontSize: 18 }}>Savings Rate: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.blue }}>{this.calcSavingsRate(income, expenses)}</Copy>
                </View>

              </ScrollView>
            )

          })}

          {futureMonths.map((item, idx) => {
            currentMonth.add(1, "month")
            const sortedExpenses = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))
            const sortedIncome = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))

            return (
              <ScrollView key={idx} style={styles.monthContainer}>

                <View style={[styles.inlineAround, { margin: 15 }]}>
                  <Title>{currentMonth.format("MMMM YYYY")}</Title>
                </View>

                <View style={[styles.inlineBetween, { marginBottom: 10 }]}>
                  <Copy style={{ fontSize: 18 }}>Income: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.green }}>{formatCurrency(income)}</Copy>
                </View>

                {this.renderExpenses(sortedIncome)}

                <View style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}>
                  <Copy style={{ fontSize: 18 }}>Expenses: </Copy>
                  <Copy style={{ color: "red" }}>{formatCurrency(expenses)}</Copy>
                </View>

                {this.renderExpenses(sortedExpenses)}

                <View style={[styles.inlineBetween, { marginTop: 30, paddingTop: 10, borderTopWidth: 1 }]}>
                  <Copy style={{ fontSize: 18 }}>Balance: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.blue }}>{formatCurrency(income - expenses)}</Copy>
                </View>

                <View style={[styles.inlineBetween, styles.alignCenter]}>
                  <Copy style={{ fontSize: 18 }}>Savings Rate: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.blue }}>{this.calcSavingsRate(income, expenses)}</Copy>
                </View>

              </ScrollView>
            )
          })}

        </ScrollView>

      </Screen>
    )
  }
}

export default Dashboard
