import React, { Component } from "react"
import { Alert, View, ScrollView } from "react-native"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton, TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { withSafeAreaInsets } from "react-native-safe-area-context"

import { Screen, Header } from "../../components"
import { Copy } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"
import { formatCurrency } from "../../utils/currency"
import { isAndroid } from "../../utils/os-utils"
import palette from "../../utils/palette"

const accountBalance = (account, transactions) => {
  if (transactions.length === 0) return 0

  const accountTransactions = transactions.filter(item => account.id === get(item, "accountId"))

  if (accountTransactions.length === 0) {
    return 0
  }

  const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }))

  return total.amount
}

class Accounts extends Component {
  static contextType = DarkModeContext

  renderDeleteButton = account => (
    <View style={{ width: 70 }}>
      <RectButton style={styles.deleteButton} onPress={() => this.handleDelete(account)}>
        <Icon type="trash-alt" />
      </RectButton>
    </View>
  )

  renderEditButton = () => (
    <View style={styles.editButton}>
      <Icon style={{ backgroundColor: "blue" }} />
      <Copy style={{ color: "white" }}>Edit</Copy>
    </View>
  )

  handleDelete = (account) => {
    const { remove, removeTransactions, transactions } = this.props
    const count = transactions.filter(item => account.id === get(item, "accountId")).length
    if (count > 0) {
      Alert.alert("Warning!", "Cannot delete account that contains transactions", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete all transactions",
          onPress: () => {
            removeTransactions(account)
            remove(account)
          },
        },
      ])
    } else {
      remove(account)
    }
  }

  render() {
    const { navigation, accounts, transactions, theme, insets } = this.props
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"

    return (
      <Screen>
        <Header title="Accounts" backBtn withInsets />
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}>
          <View style={{ borderColor: "gray", borderTopWidth: 1 }}>
            {accounts.map(account => (
              <Swipeable key={account.id} renderRightActions={() => this.renderDeleteButton(account)} containerStyle={styles.swiperWrap}>
                <RectButton 
                  key={account.id}
                  onPress={() => navigation.navigate("AccountEdit", { id: account.id })}
                  activeOpacity={darkMode ? 0.5 : 0.1}
                  style={[styles.wrap, darkMode && styles.wrapDark]}
                  rippleColor={darkMode ? palette.darkGray : palette.lightBlue}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                      <Icon type={account.icon} style={{ marginRight: 10 }} textStyle={{ color: account.color, fontSize: 20 }} />
                      <Copy>
                        {`${account.name} `}
                        <Copy style={{ fontSize: 12 }}>{`(${formatCurrency(accountBalance(account, transactions), account.currency)})`}</Copy>
                      </Copy>
                      {account.defaultAccount && <Icon type="star" textStyle={{ color: "orange", fontSize: 10 }} />}
                    </View>

                    <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
                </RectButton>
              </Swipeable>
            ))}
          </View>
        </ScrollView>

        <View style={[isAndroid && { paddingBottom: 10 }, { width: "80%", left: "10%", bottom: insets.bottom, position: "absolute" }]}>
          <TouchableOpacity onPress={() => navigation.navigate("AccountEdit")} style={styles.addWrap}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#2292f4", "#2031f4"]} style={[{ height: 50, width: 200 }, styles.add]}>
              <Copy style={{ color: "white" }}>Add new account</Copy>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}

export default withSafeAreaInsets(Accounts)
