import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Animated, FlatList } from "react-native"
//import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { Modalize } from "react-native-modalize"
import { Portal } from "react-native-portalize"
import { get } from "lodash"
import moment from "moment"


import { Screen, Icon, Copy, Title, Transaction } from "../../components"
import styles from "./styles"
import palette from "../../utils/palette"
import { calcAmount } from "../../utils/helper-gnomes"
import { formatCurrency } from "../../utils/currency"
import { useTheme } from "../../utils/ui-utils"
import { isIos } from "../../utils/os-utils"



const initItems = [
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
  {id: 3},
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




export default (props) => {
  const [items, setItems] = useState(initItems)
  const [curIdx, setCurIdx] = useState(8)
  
  const [viewId, setViewId] = useState(0)
  const [breakdownTransactions, setBreakdownTransactions] = useState([])
  const HEIGHT = Dimensions.get("window").height
  const WIDTH = Dimensions.get("window").width
  const currentMonth = moment()
  const { transactions } = props
  const darkMode = useTheme()
  const flatListRef = useRef()
  const breakdownModal = useRef()
  const scrollX = new Animated.Value(0)


  const getCurrentView = (offsetX) => {
    const WIDTH = Dimensions.get("window").width
    const curViewIndex = Math.round(offsetX / WIDTH)


    if (curIdx === curViewIndex) {
      return
    } else {
      setCurIdx(curViewIndex)
      setViewId(items[curViewIndex].id)
      
    }

    if (Math.round(offsetX / WIDTH) === (items.length - 1 )) {
      setItems((items) => {
        const lastId = items[items.length -1].id
        return [
          ...items,
          {id: lastId + 1},
          {id: lastId + 2},
          {id: lastId + 3},
          {id: lastId + 4},
          {id: lastId + 5}
        ]
      })
    }

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
    const income = sum(filterByMonth(transactions.filter(t => t.type === "income"), month.toDate()))
    const expenses = sum(filterByMonth(transactions.filter(t => t.type === "expense"), month.toDate()))
    const sortedExpenses = sortByCategory(filterByMonth(transactions.filter(t => t.type === "expense"), month.toDate()))
    const sortedIncome = sortByCategory(filterByMonth(transactions.filter(t => t.type === "income"), month.toDate()))
    const currentMonthTransactions = filterByMonth(transactions.filter(t => t.type === "expense"), month.toDate()).sort(compare)
    const currentMonthIncome = filterByMonth(transactions.filter(t => t.type === "income"), month.toDate()).sort(compare)
    const currentItemIndex = items.findIndex((i) => i.id === item.id)
    const currentMonthIndex = items.findIndex((item) => item.id === 0)
    const defItem = items.find((i) => i.id == 0)

    const transX = scrollX.interpolate({
      inputRange: [(currentItemIndex - 1) * WIDTH, currentItemIndex * WIDTH , WIDTH * (currentItemIndex + 1)],
      outputRange: [200, 0, -200],
    })

    const opacity = scrollX.interpolate({
      inputRange: [(currentItemIndex - 1) * WIDTH, currentItemIndex * WIDTH , WIDTH * (currentItemIndex + 1)],
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    })

    return (
      <Animated.ScrollView style={[styles.monthContainer, {opacity}]}>
        
        <View style={[styles.inlineBetween, { marginTop: 15, marginBottom: 15 }]}>
          { item.id > 0
            ? (
              <TouchableOpacity onPress={() => flatListRef.current.scrollToIndex({ index: currentMonthIndex, animated: true })}
                                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                <View style={[styles.inline, { width: 10 }]}>
                  <Icon type="backward" style={{ marginRight: 5 }} textStyle={{ fontSize: 12, color: darkMode ? palette.light : palette.dark }} />
                </View>
              </TouchableOpacity>
            ) : <View />
          }
          <Animated.View style={{transform: [{translateX: transX}]}}>
            <Title>{month.format("MMMM YYYY")}</Title>
          </Animated.View>
          

          { item.id < 0
            ? (
              <TouchableOpacity onPress={() => flatListRef.current.scrollToIndex({ index: currentMonthIndex, animated: true })}
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
            setBreakdownTransactions(currentMonthTransactions)
            breakdownModal.current.open()
          }}>
          <Copy style={{ fontSize: 18 }}>Expenses: </Copy>
          <Copy style={{ fontSize: 18, color: palette.red }}>{formatCurrency(expenses)}</Copy>
        </TouchableOpacity>
        
        {renderExpenses(sortedExpenses, currentMonthTransactions)}

        <View style={[styles.inlineBetween, { marginTop: 30, paddingTop: 10, borderTopWidth: 1 }]}>
          <Copy style={{ fontSize: 18 }}>Balance: </Copy>
          <Copy style={{ fontSize: 18, color: palette.blue }}>{formatCurrency(income - expenses)}</Copy>
        </View>

        <View style={[styles.inlineBetween, styles.alignCenter]}>
          <Copy style={{ fontSize: 18 }}>Savings Rate: </Copy>
          <Copy style={{ fontSize: 18, color: palette.blue }}>{calcSavingsRate(income, expenses)}</Copy>
        </View>
      </Animated.ScrollView>
    )
  }

  useLayoutEffect(() => {
    
    if (curIdx === 0){
      setItems((items) => {
        const firstId = items[0].id
        return [
          {id: firstId - 5},
          {id: firstId - 4},
          {id: firstId - 3},
          {id: firstId - 2},
          {id: firstId - 1},
          ...items,
          
        ]
      })
    }
    
  },[curIdx])

  useEffect(() => {
    flatListRef.current.scrollToIndex({index: items.findIndex((i) => i.id === viewId), animated: false})
  }, [items])

  return (
    <Screen>
      <Animated.FlatList
        ref={flatListRef}
        data={items}

        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false,
            listener: (e) => getCurrentView(get(e, "nativeEvent.contentOffset.x"))
           },
        )}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        initialScrollIndex={8}
        getItemLayout={(items, index) => (
          {length: WIDTH, offset: WIDTH * index, index}
        )}
        keyExtractor={(item) => item.id}
        windowSize={5}
      />

      <Portal>
        <Modalize
          ref={breakdownModal}
          adjustToContentHeight
          modalStyle={[styles.modal, styles.modalDark, darkMode && { backgroundColor: palette.dark }]}
          modalTopOffset={100}
          flatListProps={{
            style: { paddingBottom: 20 },
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
          }}/>
      </Portal>

    </Screen>
  )

}