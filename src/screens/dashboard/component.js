import React, { Component } from "react"
import { View, Appearance, Alert, Dimensions, StatusBar, TouchableOpacity, Animated } from "react-native"
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

const filterByMonth = (transactions, currentDate) => {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  return transactions.filter(t => t.timestamp > firstDayOfMonth.getTime() && t.timestamp < lastDayOfMonth.getTime())
}

const filterByCategory = (transactions, categoryId) => transactions.filter(t => t.categoryId === categoryId)

const renderBudget = (value, budget) => {
  const result = Math.round((value / budget) * 100)
  let color = false
  if (result >= 100) { color = palette.red } else if (result >= 80) { color = palette.orange } else { color = false }
  const copyStyle = color ? {fontSize: 12, color} : {fontSize: 12}
  return budget && budget > 0 && <Copy style={copyStyle}>({result}%)</Copy>
}

class Dashboard extends Component {

  static contextType = DarkModeContext

  state = {
    showScrollToEnd: false,
    showScrollToStart: false,
    breakdownTransactions: [],
    scrollX: new Animated.Value(0)
  }

  breakdownModal = React.createRef()

  scrollRef = React.createRef()

  componentDidMount() {
    const { route, navigation, openOnForm } = this.props
    const { width } = Dimensions.get("window")
    !isIos && StatusBar.setBackgroundColor(palette.blue)
    setTimeout(() => this.scrollView.scrollTo({ x: width * 23, y: 0, animated: false }), 100)
    setTimeout((()=> openOnForm && navigation.navigate("TransactionForm", { clearForm: true })), 0)
    setTimeout(() => SplashScreen.hide(), 500)
  }

  sortByCategory = (expenses) => {
    const result = {}
    const { categories } = this.props
    expenses.forEach((expense) => {
      const category = categories.find(cat => cat.id === expense.categoryId)
      const currExpenseSum = result[category?.name] || 0
      result[category?.name] = currExpenseSum + calcAmount(expense)
    })

    return result
  }

  changeAccountFilter = () => {
    const { accounts, changeAccountFilter } = this.props
    Alert.alert(
      __("Select account"),
      __("Please choose account"),
      accounts.map(account => (
        { text: account?.name, onPress: () => changeAccountFilter(account) }
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
    const { transactions, navigation, theme } = this.props
    const { width } = Dimensions.get("window")
    const currentMonth = moment()
    currentMonth.subtract(24, "month")
    const systemTheme = Appearance.getColorScheme();
    const darkMode = theme === "system" ? systemTheme === "dark" : theme === "dark"

    return (
      <Screen>

        <Animated.ScrollView
          horizontal
          pagingEnabled
          ref={(ref) => { this.scrollView = ref }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
            { useNativeDriver: false },
          )}
          showsHorizontalScrollIndicator={false}>

          { months.map((month, idx) => {
            currentMonth.add(1, "month")
            const sortedExpenses = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth.toDate()))
            const sortedIncome = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth.toDate()))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth.toDate()))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth.toDate()))
            const currentMonthTransactions = filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth.toDate()).sort(compare)
            const currentMonthIncome = filterByMonth(transactions.filter(t => t.type === "income"), currentMonth.toDate()).sort(compare)

            const opacity = this.state.scrollX.interpolate({
              inputRange: [(idx - 1) * width, idx * width , width * (idx + 1)],
              outputRange: [0, 1, 0],
              extrapolate: "clamp",
            })

            const scale = this.state.scrollX.interpolate({
              inputRange: [(idx - 1) * width, idx * width , width * (idx + 1)],
              outputRange: [0.9, 1, 0.9],
              extrapolate: "clamp",
            })

            const transX = this.state.scrollX.interpolate({
              inputRange: [(idx - 1) * width, idx * width , width * (idx + 1)],
              outputRange: [200, 0, -200],
            })

            const bg = this.state.scrollX.interpolate({
              inputRange: [(idx - 1) * width, idx * width , width * (idx + 1)],
              outputRange: ["rgb(7, 16,145)", "rgb(13,61,251)", "rgb(7, 16,145)"],
            })

            return (
              <Animated.ScrollView key={month} style={[styles.monthContainer, {opacity}]}>

                <View style={[styles.inlineBetween, { marginTop: 15, marginBottom: 15 }]}>
                  <View />
                  <Animated.View style={{transform: [{translateX: transX}]}}>
                    <Title>{currentMonth.format("MMMM YYYY")}</Title>
                  </Animated.View>

                  { idx !== 23
                    ? (
                      <TouchableOpacity onPress={() => this.scrollView.scrollTo({ x: width * 23, animated: true })}
                                        hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                        <View style={[styles.inline, { width: 10 }]}>
                          <Icon type="forward" style={{ marginRight: 5 }} textStyle={{ fontSize: 12, color: darkMode ? palette.light : palette.dark }} />
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

              </Animated.ScrollView>
            )

          })}

          {futureMonths.map((month, idx) => {
            currentMonth.add(1, "month")
            const sortedExpenses = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth.toDate()))
            const sortedIncome = this.sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth.toDate()))
            const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), currentMonth.toDate()))
            const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), currentMonth.toDate()))
            const inputRange = [(idx + 24 - 1) * width, (idx + 24) * width , width * (idx + 24 + 1)]

            const opacity = this.state.scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: "clamp",
            })

            const scale = this.state.scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: "clamp",
            })

            const transX = this.state.scrollX.interpolate({
              inputRange,
              outputRange: [200, 0, -200],
            })

            return (
              <Animated.ScrollView key={month} style={[styles.monthContainer, {opacity}]}>

                <View style={[styles.inlineBetween, { marginTop: 15, marginBottom: 15 }]}>
                  <TouchableOpacity onPress={() => this.scrollView.scrollTo({ x: width * 23, animated: true })}
                                    hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                    <View style={[styles.inline, { width: 10 }]}>
                      <Icon type="backward" style={{ marginLeft: 2 }} textStyle={{ fontSize: 12, color: darkMode ? palette.light : palette.dark }} />
                    </View>
                  </TouchableOpacity>

                  <Animated.View style={{transform: [{translateX: transX}]}}>
                    <Title>{currentMonth.format("MMMM YYYY")}</Title>
                  </Animated.View>

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

              </Animated.ScrollView>
            )
          })}

        </Animated.ScrollView>

        <Portal>
          <Modalize
            adjustToContentHeight
            modalStyle={[styles.modal, styles.modalDark, darkMode && { backgroundColor: palette.dark }]}
            modalTopOffset={100}
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
