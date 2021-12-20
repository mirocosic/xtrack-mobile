import React, { useState } from "react"
import { ScrollView, View, Dimensions } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { get, isEmpty } from "lodash"
import { PieChart } from "react-native-chart-kit";

import { Screen, Header, Icon, Title, Copy } from "../../components"
import { isAndroid } from "../../utils/os-utils"
import palette from "../../utils/palette"
import { formatCurrency } from "../../utils/currency"
import { useDarkTheme} from "../../utils/ui-utils"
import { calcAmount, calculateIncome, calculateExpenses } from "../../utils/helper-gnomes"
import styles from "./styles"

export default ({accounts, transactions, categories, navigation, route: { params: {accountId}}}) => {

  const account = accounts.find((acc) => acc.id === accountId)
  const [showExpensesChart, setShowExpensesChart] = useState(false)
  const darkMode = useDarkTheme()

  const sum = transactions => transactions.reduce((acc, transaction) => acc + calcAmount(transaction), 0)

  const sortByCategory = (expenses) => {
    const result = {}
    expenses.forEach((expense) => {
      const category = categories.find(cat => cat.id === expense.categoryId)
      const currExpenseSum = result[category.name] || 0
      result[category.name] = currExpenseSum + calcAmount(expense)
    })
    return result
  }

  const renderExpenses = expenses => Object.entries(expenses)
  .sort((a, b) => b[1] - a[1])
  .map((item) => {
    const cat = categories.find(c => c.name === item[0])
    return (
      <View key={item[0]} style={{ ...styles.row, paddingLeft: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, paddingRight: 15 }}>
          <Icon
            type={get(cat, "icon", "")}
            textStyle={{ color: cat.color || "blue", fontSize: 12 }}
            style={{ marginRight: 5, width: 20, height: 20 }}
            />
          <Copy style={{ fontSize: 14 }}>{`${item[0]} `} </Copy>
        </View>
        <Copy style={{ fontSize: 14 }}>{` ${formatCurrency(item[1])} `}</Copy>
      </View>
    )
  })

  const sortedIncome = sortByCategory(transactions.filter(t => t.type === "income" && !t.isTransfer).filter(t => t.accountId === account.id))
  const sortedExpenses = sortByCategory(transactions.filter(t => t.type === "expense" && !t.isTransfer).filter(t => t.accountId === account.id))
  const sortedTransfers = sortByCategory(transactions.filter(t => t.type === "transfer" && !t.isTransfer).filter(t => t.accountId === account.id || t.fromAccountId === account.id))

  return (
    <Screen>
      <Header
        icon={<Icon type={account.icon} textStyle={{ color: account.color }} />}
        title={account.name}
        backBtn={isAndroid}/>

      <ScrollView style={{padding: 20}}>

      <View style={[styles.inlineBetween, { marginBottom: 30 }]}>
          <Copy style={{ fontSize: 18 }}>Starting Balance: </Copy>
          <Copy style={{ fontSize: 18 }}>{formatCurrency(account.startingBalance)}</Copy>
        </View>

        <View style={[styles.inlineBetween, { marginBottom: 10 }]}>
          <Copy style={{ fontSize: 18 }}>Income: </Copy>
          <Copy style={{ fontSize: 18, color: palette.green }}>{formatCurrency(sum(transactions.filter(t => t.type === "income" && !t.isTransfer).filter(t => t.accountId === account.id)))}</Copy>
        </View>

        {renderExpenses(sortedIncome)}

        <View style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}>
          <Copy style={{ fontSize: 18 }}>Expenses: </Copy>
          <Copy style={{ fontSize: 18, color: palette.red }}>{formatCurrency(sum(transactions.filter(t => t.type === "expense" && !t.isTransfer).filter(t => t.accountId === account.id)))}</Copy>
        </View>

        {renderExpenses(sortedExpenses)}

        <View style={[styles.inlineBetween, { marginBottom: 10, paddingTop: 20 }]}>
          <Copy style={{ fontSize: 18 }}>Transfers: </Copy>
          <Copy style={{ fontSize: 18, color: palette.white }}>{formatCurrency(sum(transactions.filter(t => t.type === "transfer" && !t.isTransfer).filter(t => t.accountId === account.id || t.fromAccountId === account.id)))}</Copy>
        </View>

        {renderExpenses(sortedTransfers)}

        <View style={{paddingVertical: 20}}>

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

      </ScrollView>
    </Screen>
  )
}