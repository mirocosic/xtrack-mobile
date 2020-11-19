import React, { Component } from "react"
import { View, ScrollView, Alert, Dimensions, StatusBar, TouchableOpacity } from "react-native"
import { get } from "lodash"
import moment from "moment"
import SplashScreen from "react-native-splash-screen"
import { Modalize } from "react-native-modalize"
import { Portal } from "react-native-portalize"
import { DarkModeContext } from "react-native-dark-mode"

import { Screen, Icon, Copy, Title, Transaction } from "../../components"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import palette from "../../utils/palette"
import { calcAmount } from "../../utils/helper-gnomes"
import { isIos } from "../../utils/os-utils"
import styles from "./styles"

const compare = (a, b) => {

  if (a.categoryId < b.categoryId) {
    return -1;
  }
  if (a.categoryId > b.categoryId) {
    return 1;
  }
  return 0;

}

const months = [...Array(24).keys()]
const futureMonths = [...Array(12).keys()]

const sum = transactions => transactions.reduce((acc, transaction) => acc + calcAmount(transaction), 0)

const filterByMonth = (transactions, currentMonth) => (
  transactions.filter(t => moment(t.timestamp) > currentMonth.startOf("month")
                           && moment(t.timestamp) < currentMonth.endOf("month")))

const filterByCategory = (transactions, categoryId) => transactions.filter(t => t.categoryId === categoryId)

const renderBudget = (value, budget) => {
  const result = Math.round((value / budget) * 100)
  let color = false
  if (result >= 100) { color = palette.red } else if (result >= 80) { color = palette.orange } else { color = false }
  return budget && budget > 0 && <Copy style={{ fontSize: 12, color }}>({result}%)</Copy>
}

class Dashboard extends Component {

  static contextType = DarkModeContext

  state = {
    showScrollToEnd: false,
    showScrollToStart: false,
    breakdownTransactions: [],
  }

  breakdownModal = React.createRef()

  componentDidMount() {
    const { navigation, openOnForm } = this.props
    const { width } = Dimensions.get("window")
    !isIos && StatusBar.setBackgroundColor(palette.blue)
    openOnForm && navigation.navigate("TransactionForm", { clearForm: true })
    setTimeout(() => this.scrollView.scrollTo({ x: width * 23, y: 0, animated: false }), 100)
    setTimeout(() => SplashScreen.hide(), 500)
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


  renderExpenses = (expenses, currentMonthTransactions, modal) => (
    Object.entries(expenses)
      .sort((a, b) => b[1] - a[1])
      .map((item) => {
        const { categories } = this.props
        const cat = categories.find(c => c.name === item[0])
        return (
          <TouchableOpacity
            key={item[0]}
            style={{ ...styles.row, paddingLeft: 10 }}
            onPress={() => {
              this.setState({ breakdownTransactions: filterByCategory(currentMonthTransactions, cat.id) })
              this.breakdownModal.current.open()
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center" }}
              >
              <Icon
                type={get(cat, "icon", "")}
                textStyle={{ color: cat.color || "blue", fontSize: 12 }}
                style={{ marginRight: 5, width: 20, height: 20 }}
              />
              <Copy style={{ fontSize: 14 }}>{`${item[0]} `} { renderBudget(item[1], cat.budget) } </Copy>

            </View>
            <Copy style={{ fontSize: 14 }}>

              {` ${formatCurrency(item[1])} `}
            </Copy>

          </TouchableOpacity>
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
    const { transactions, navigation } = this.props
    const { width } = Dimensions.get("window")
    const currentMonth = moment()
    currentMonth.subtract(24, "month")
    const darkMode = this.context === "dark"

    return (
      <Screen>

        <ScrollView
          horizontal
          pagingEnabled
          ref={(ref) => { this.scrollView = ref }}
          showsHorizontalScrollIndicator={false}>

          { months.map((month, idx) => {
            currentMonth.add(1, "month")
            const sortedExpenses = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))
            const sortedIncome = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))
            const currentMonthTransactions = filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth).sort(compare)
            const currentMonthIncome = filterByMonth(transactions.filter(t => t.type === "income"), currentMonth).sort(compare)

            return (
              <ScrollView key={month} style={styles.monthContainer}>

                <View style={[styles.inlineBetween, { marginTop: 15, marginBottom: 15 }]}>
                  <View />
                  <Title>{currentMonth.format("MMMM YYYY")}</Title>
                  { idx !== 23
                    ? (
                      <TouchableOpacity onPress={() => this.scrollView.scrollTo({ x: width * 23, animated: true })}>
                        <View style={[styles.inline, { width: 10 }]}>
                          <Icon type="forward" style={{ marginRight: 0 }} textStyle={{ fontSize: 12 }} />
                        </View>
                      </TouchableOpacity>
                    ) : <View />
                  }

                </View>

                <TouchableOpacity
                  style={[styles.inlineBetween, { marginBottom: 10 }]}
                  onPress={() => {
                    this.setState({ breakdownTransactions: currentMonthIncome })
                    this.breakdownModal.current.open()
                  }}>
                  <Copy style={{ fontSize: 18 }}>Income: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.green }}>{formatCurrency(income)}</Copy>
                </TouchableOpacity>

                {this.renderExpenses(sortedIncome, currentMonthIncome)}


                <TouchableOpacity
                  style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}
                  onPress={() => {
                    this.setState({ breakdownTransactions: currentMonthTransactions })
                    this.breakdownModal.current.open()
                  }}>
                  <Copy style={{ fontSize: 18 }}>Expenses: </Copy>
                  <Copy style={{ fontSize: 18, color: palette.red }}>{formatCurrency(expenses)}</Copy>
                </TouchableOpacity>

                {this.renderExpenses(sortedExpenses, currentMonthTransactions)}

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

          {futureMonths.map((month) => {
            currentMonth.add(1, "month")
            const sortedExpenses = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))
            const sortedIncome = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth))

            return (
              <ScrollView key={month} style={styles.monthContainer}>

                <View style={[styles.inlineBetween, { marginTop: 15, marginBottom: 15 }]}>
                  <TouchableOpacity onPress={() => this.scrollView.scrollTo({ x: width * 23, animated: true })}>
                    <View style={[styles.inline, { width: 10 }]}>
                      <Icon type="backward" style={{ marginLeft: 0 }} textStyle={{ fontSize: 12 }} />
                    </View>
                  </TouchableOpacity>

                  <Title>{currentMonth.format("MMMM YYYY")}</Title>
                  <View />

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

        <Portal>
          <Modalize
            adjustToContentHeight
            modalStyle={[styles.modal, styles.modalDark, darkMode && { backgroundColor: palette.dark }]}
            modalTopOffset={100}
            FloatingComponent={isIos ? null : <TouchableOpacity onPress={() => this.breakdownModal.current.close()} style={{ position: "absolute", top: 20, right: 20 }}><Title>X</Title></TouchableOpacity>}
            flatListProps={{
              style: { paddingBottom: 20 },
              showsVerticalScrollIndicator: false,
              data: this.state.breakdownTransactions,
              initialNumToRender: 20,
              renderItem: ({ item }) => (
                <Transaction
                  key={item.id}
                  transaction={item}
                  navigation={navigation} />),
              keyExtractor: item => item.id,
            }}
            ref={this.breakdownModal} />
        </Portal>

      </Screen>
    )
  }
}

export default Dashboard
