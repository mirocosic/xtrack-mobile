import React, { useState, useRef, useEffect } from "react"
import { View, Dimensions, TouchableOpacity, Animated } from "react-native"
import { Modalize } from "react-native-modalize"
import { Portal } from "react-native-portalize"
import { get, isEmpty } from "lodash"
import moment from "moment"
import { PieChart } from "react-native-chart-kit"
import { RectButton } from "react-native-gesture-handler"

import { Screen, Icon, Copy, Title, Transaction } from "../../components"
import styles from "./styles"
import palette from "../../utils/palette"
import { calcAmount } from "../../utils/helper-gnomes"
import { formatCurrency } from "../../utils/currency"
import { useDarkTheme } from "../../utils/ui-utils"
import { useSafeAreaInsets } from "react-native-safe-area-context"


const initItems = [
  {id: -23},
  {id: -22},
  {id: -21},
  {id: -20},
  {id: -19},
  {id: -18},
  {id: -17},
  {id: -16},
  {id: -15},
  {id: -14},
  {id: -13},
  {id: -12},
  {id: -11},
  {id: -10},
  {id: -9},
  {id: -8},
  {id: -7},
  {id: -6},
  {id: -5},
  {id: -4},
  {id: -3},
  {id: -2},
  {id: -1},
  {id: 0},
  {id: 1},
  {id: 2},
]

const compare = (a, b) => {

  if (a.categoryId < b.categoryId) {
    return -1;
  }
  if (a.categoryId > b.categoryId) {
    return 1;
  }
  return 0;

}

const sum = transactions => transactions.reduce((acc, transaction) => acc + calcAmount(transaction), 0)


const filterByMonth = (transactions, currentDate) => {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 2) /// check this for timezone data
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1, 2)
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




export default (props) => {
  const [items, setItems] = useState(initItems)
  const [breakdownTransactions, setBreakdownTransactions] = useState([])
  const WIDTH = Dimensions.get("window").width
  const currentMonth = moment()
  const { transactions, openOnForm, navigation } = props
  const darkMode = useDarkTheme()
  const flatListRef = useRef()
  const breakdownModal = useRef()
  const scrollX = new Animated.Value(0)
  const [showExpensesChart, setShowExpensesChart] = useState(true)
  const insets = useSafeAreaInsets()


  const addViewItems = () => {
    setItems((items) => {
      const lastId = items[items.length -1].id
      return [
        ...items,
        {id: lastId + 1},
        {id: lastId + 2},
        {id: lastId + 3},
      ]
    })
  }

  const sortByCategory = (expenses) => {
    const result = {}
    const { categories } = props
    expenses.forEach((expense) => {
      const category = categories.find(cat => cat.id === expense.categoryId)
      const currExpenseSum = result[category?.name] || 0
      result[category?.name] = currExpenseSum + calcAmount(expense)
    })

    return result
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

  prepDataForPieChart = (expenses) => {
    return Object.entries(expenses)
      .sort((a, b) => b[1] - a[1])
      .map((item) => {
        const { categories } = props
        const cat = categories.find(c => c.name === item[0])
        return {
          name: item[0],
          amount: item[1],
          color: cat.color,
          legendFontColor: darkMode ? "white" : "black"
        }
      })
    }



  renderExpenses = (expenses, currentMonthTransactions, modal) => (
    Object.entries(expenses)
      .sort((a, b) => b[1] - a[1])
      .map((item) => {
        const { categories } = props
        const cat = categories.find(c => c.name === item[0])
        return (
          <TouchableOpacity
            key={item[0]}
            style={{ ...styles.row, paddingLeft: 10 }}
            onPress={() => {
              setBreakdownTransactions(filterByCategory(currentMonthTransactions, cat.id))
              breakdownModal.current.open()
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1, paddingRight: 15 }}>
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


  const renderItem = ({item}) => {
    const month = item.id >= 0 ? currentMonth.clone().add(item.id, "month") : currentMonth.clone().subtract(Math.abs(item.id), "month")
    const filterTransactions = (type) => filterByMonth(transactions.filter(t => t.type === type && !t.isTransfer), month.toDate())

    const income = sum(filterTransactions("income"))
    const expenses = sum(filterTransactions("expense"))
    const transfers = sum(filterTransactions("transfer"))

    const sortedIncome = sortByCategory(filterTransactions("income"))
    const sortedExpenses = sortByCategory(filterTransactions("expense"))
    const sortedTransfers = sortByCategory(filterTransactions("transfer"))

    const currentMonthIncome = filterTransactions("income").sort(compare)
    const currentMonthExpenses = filterTransactions("expense").sort(compare)
    const currentMonthTransfers = filterTransactions("transfer").sort(compare)

    const currentItemIndex = items.findIndex((i) => i.id === item.id)
    const currentMonthIndex = items.findIndex((item) => item.id === 0)


    const transX = scrollX.interpolate({
      inputRange: [(currentItemIndex - 1) * WIDTH, currentItemIndex * WIDTH , WIDTH * (currentItemIndex + 1)],
      outputRange: [200, 0, -200],
    })

    // todo: fix opacity animation
    const opacity = scrollX.interpolate({
      inputRange: [(currentItemIndex - 1) * WIDTH, currentItemIndex * WIDTH , WIDTH * (currentItemIndex + 1)],
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    })

    return (
      <Animated.ScrollView style={[styles.monthContainer]}>
        
        <View style={[styles.inlineBetween, { marginTop: 15, marginBottom: 15 }]}>
          { item.id > 0
            ? (
              <TouchableOpacity onPress={() => flatListRef.current.scrollToIndex({ index: currentMonthIndex, animated: true })}
                                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                <View style={[styles.inline, { width: 10 }]}>
                  <Icon type="backward" style={{ marginRight: 5 }} textStyle={{ fontSize: 12, color: darkMode ? palette.light : palette.darkHex }} />
                </View>
              </TouchableOpacity>
            ) : <View />
          }
          <Animated.View 
          //style={{transform: [{translateX: transX}]}}
          >
            <Title>{month.format("MMMM YYYY")}</Title>
          </Animated.View>
          

          { item.id < 0
            ? (
              <TouchableOpacity onPress={() => flatListRef.current.scrollToIndex({ index: currentMonthIndex, animated: true })}
                                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                <View style={[styles.inline, { width: 10 }]}>
                  <Icon type="forward" style={{ marginRight: 5 }} textStyle={{ fontSize: 12, color: darkMode ? palette.light : palette.darkHex }} />
                </View>
              </TouchableOpacity>
            ) : <View />
          }

        </View>

        <TouchableOpacity
          style={[styles.inlineBetween, { marginBottom: 10 }]}
          onPress={() => {
            setBreakdownTransactions(currentMonthIncome)
            breakdownModal.current.open()
          }}>
          <Copy style={{ fontSize: 18 }}>Income: </Copy>
          <Copy style={{ fontSize: 18, color: palette.green }}>{formatCurrency(income)}</Copy>
        </TouchableOpacity>

        {renderExpenses(sortedIncome, currentMonthIncome)}


        <TouchableOpacity
          style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}
          onPress={() => {
            setBreakdownTransactions(currentMonthExpenses)
            breakdownModal.current.open()
          }}>
          <Copy style={{ fontSize: 18 }}>Expenses: </Copy>
          <Copy style={{ fontSize: 18, color: palette.red }}>{formatCurrency(expenses)}</Copy>
        </TouchableOpacity>
        
        {renderExpenses(sortedExpenses, currentMonthExpenses)}

        { currentMonthTransfers.length > 0 &&
          <TouchableOpacity
            style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}
            onPress={() => {
              setBreakdownTransactions(currentMonthTransfers)
              breakdownModal.current.open()
            }}>
            <Copy style={{ fontSize: 18 }}>Transfers: </Copy>
            <Copy style={{ fontSize: 18}}>{formatCurrency(transfers)}</Copy>
          </TouchableOpacity>
        }
        
        {renderExpenses(sortedTransfers, currentMonthTransfers)}

        <View style={[styles.inlineBetween, { marginTop: 30, paddingTop: 10, borderTopWidth: 1 }]}>
          <Copy style={{ fontSize: 18 }}>Balance: </Copy>
          <Copy style={{ fontSize: 18, color: palette.blue }}>{formatCurrency(income - expenses)}</Copy>
        </View>

        <View style={[styles.inlineBetween, styles.alignCenter]}>
          <Copy style={{ fontSize: 18 }}>Savings Rate: </Copy>
          <Copy style={{ fontSize: 18, color: palette.blue }}>{calcSavingsRate(income, expenses)}</Copy>
        </View>

        <View style={{paddingTop: 50, paddingBottom: 50}}>

          {/* <BarChart
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            data={{
              labels: ["Expenses", "Income"],
              datasets: [
                {
                  data: [expenses, income]
                }
              ]
            }}
            width={Dimensions.get("window").width - 40} // from react-native
            height={200}
            yAxisLabel="%"
            chartConfig={{
              color: (opacity = 1) => `rgba(150, 215, 115, ${opacity})`,
              style: {
                borderRadius: 16
              },
            }}
          /> */}



          <View style={[styles.inline]}>

            {
              !isEmpty(sortedExpenses) &&
              <RectButton onPress={() => setShowExpensesChart(true)}
                style={[styles.chartTab, showExpensesChart && styles.chartTabSelected]}>
                <Copy style={showExpensesChart && {color: "white"}}>Expenses</Copy>
              </RectButton>
            }
            

            {
              !isEmpty(sortedIncome) &&
              <RectButton onPress={() => setShowExpensesChart(false)}
                style={[styles.chartTab, !showExpensesChart && styles.chartTabSelected, darkMode && styles.chartTabDark]}>
                <Copy style={!showExpensesChart && {color: "white"}}>Income</Copy>
              </RectButton>
            }
            
            
          </View>

          <PieChart
            data={prepDataForPieChart(showExpensesChart ? sortedExpenses : sortedIncome)}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            accessor="amount"
            chartConfig={{
              color: (opacity = 1) => `rgba(150, 215, 115, ${opacity})`,
              style: {
                borderRadius: 16
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

      </Animated.ScrollView>
    )
  }

  useEffect(() => {
    setTimeout((() => openOnForm && navigation.navigate("TransactionForm", { clearForm: true })), 0)
  }, [])

  return (
    <Screen>
      <Animated.FlatList
        ref={flatListRef}
        data={items}

        // scrollEventThrottle={16}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   { useNativeDriver: true },
        // )}

        renderItem={renderItem}
        horizontal
        pagingEnabled
        initialScrollIndex={23}
        getItemLayout={(items, index) => (
          {length: WIDTH, offset: WIDTH * index, index}
        )}
        keyExtractor={(item) => item.id}
        windowSize={3}
        onEndReached={addViewItems}
      />

      <Portal>
        <Modalize
          ref={breakdownModal}
          adjustToContentHeight
          modalStyle={[styles.modal, styles.modalDark, darkMode && { backgroundColor: palette.dark }]}
          modalTopOffset={100}
          flatListProps={{
            style: { paddingBottom: 20 },
            contentContainerStyle: {paddingBottom: insets.bottom, overflow: "hidden", borderRadius: 10},
            showsVerticalScrollIndicator: false,
            data: breakdownTransactions,
            initialNumToRender: 20,
            renderItem: ({ item }) => (
              <Transaction
                key={item.id}
                transaction={item}
                navigation={props.navigation} 
                handlePress={() => breakdownModal.current.close()}/>),
            keyExtractor: item => item.id,
            ItemSeparatorComponent: () => (<View style={styles.separator}/>)
          }}/>
      </Portal>

    </Screen>
  )

}