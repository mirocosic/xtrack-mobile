import React from "react"
import { LayoutAnimation, Text, View, Platform, UIManager } from "react-native"
import moment from "moment"
import { get, truncate } from "lodash"

import { PanGestureHandler, State, RectButton } from "react-native-gesture-handler"
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Label from "../label"
import { Copy } from "../typography"
import Icon from "../icon"
import { formatCurrency } from "../../utils/currency"
import palette from "../../utils/palette"
import { useDarkTheme } from "../../utils/ui-utils"
import styles from "./styles"


if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const getAmountColor = (type) => {
  switch (type) {
    case "expense":
      return { color: palette.red }
    case "income":
      return { color: palette.green }
    case "transfer":
      return { color: palette.blue }
    default:
      return { color: palette.red }
  }
}

const renderCategory = (categories, id) => {
  const category = categories.find(cat => id === cat.id)

  return (
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      <Icon type={get(category, "icon", "")} textStyle={{ color: get(category, "color", "blue") }} style={{ width: 20, height: 25, margin:2 }} />
      <Copy style={{flex:1}}>{category && truncate(category.name, {length: 150})}</Copy>
    </View>
  )
}

const renderAccounts = (accounts, transaction) => {
  const fromAccount = accounts.find(acc => transaction.fromAccountId === acc.id)
  const account = accounts.find(acc => transaction.accountId === acc.id)

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", flex: 1 }}>

      { fromAccount &&
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
          <Icon type={get(fromAccount, "icon", "")} textStyle={{ color: get(fromAccount, "color", "blue") }} style={{ width: 20, height: 25, margin: 2}} />
          <Copy>{fromAccount && truncate(fromAccount.name, {length: 150})}</Copy>
          <Copy> => </Copy>
        </View>
      }
      
      <Icon type={get(account, "icon", "")} textStyle={{ color: get(account, "color", "blue") }} style={{ width: 20, height: 25, margin: 2}} />
      <Copy>{account && truncate(account.name, {length: 150})}</Copy>
    </View>
  )
}

const Transaction = ({ transaction, selectTransaction, deleteTransaction, navigation, categories, handlePress, accounts }) => {

  const HEIGHT = 70
  
  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton
        style={{backgroundColor: "red", alignItems: "center", padding: 10, justifyContent: "center"}}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          deleteTransaction(transaction)
        }}>
        <Icon type="trash" />
      </RectButton>
    );
  };

  return (
      <Swipeable renderRightActions={renderRightActions} containerStyle={{backgroundColor: "red"} }>
      
        <RectButton
            style={[styles.container, useDarkTheme() && styles.containerDark]}
            activeOpacity={useDarkTheme() ? 0.8 : 0.1}
            rippleColor={useDarkTheme() ? palette.darkGray : palette.lightBlue}
            onPress={() => {
              selectTransaction(transaction)
              navigation.navigate("TransactionForm", { transactionId: transaction.id })
              handlePress && handlePress()
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                {renderCategory(categories, transaction.categoryId)}
                <Text style={[styles.amount, getAmountColor(transaction.type)]}>{formatCurrency(transaction.amount, transaction.currency)}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                {renderAccounts(accounts, transaction)}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={styles.inline}>
                  <Copy style={{ fontSize: 12 }}>{moment(transaction.timestamp).format("D.MM.YYYY. HH:mm")}</Copy>
                  {transaction.recurring && (
                    <Icon type="sync" textStyle={{ color: "gray", fontSize: 14 }} style={{ width: 15, height: 15, marginLeft: 10 }} />
                  )}
                </View>
                <Copy>{transaction.note}</Copy>
                <View style={styles.labels}>
                  {transaction.labels
                    && transaction.labels.map(label => <Label key={label.uuid} label={label} style={{ marginLeft: 5, paddingRight: 10, marginBottom: 5 }} />)}
                </View>
              </View>
          </RectButton>
        </Swipeable>
  )
}

export default Transaction
