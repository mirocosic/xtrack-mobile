import React, { Component } from "react"
import { Alert, View, ScrollView } from "react-native"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton, BorderlessButton } from "react-native-gesture-handler"

import { Screen, Header, Footer } from "../../components"
import { Copy, CopyBlue } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"
import { formatCurrency } from "../../utils/currency"
import { isAndroid } from "../../utils/os-utils"

const accountBalance = (account, transactions) => {
  if (transactions.length === 0) return 0;

  const accountTransactions = transactions.filter(item => account.id === get(item, "accountId"));

  if (accountTransactions.length === 0) { return 0 }

  const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));

  return total.amount;
}

class Accounts extends Component {

  static contextType = DarkModeContext

  state = { scroll: true }

  renderDeleteButton = account => (
    <View style={{ width: 70 }}>
      <RectButton
        style={styles.deleteButton}
        onPress={() => this.handleDelete(account)}
      >
        <Icon type="trash-alt" />
      </RectButton>
    </View>
  );

  renderEditButton = () => (
    <View style={styles.editButton}>
      <Icon style={{ backgroundColor: "blue" }} />
      <Copy style={{ color: "white" }}>Edit</Copy>
    </View>
  )

  handleDelete = (account) => {
    const { remove, removeTransactions, transactions } = this.props
    const count = transactions.filter(item => account.id === get(item, "account.id")).length
    if (count > 0) {
      Alert.alert(
        "Warning!",
        "Cannot delete account that contains transactions",
        [{
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete all transactions",
          onPress: () => { removeTransactions(account); remove(account); },
        }],
      )
    } else {
      remove(account)
    }
  }

  render() {
    const { scroll } = this.state
    const { navigation, accounts, transactions } = this.props
    const darkMode = this.context === "dark"
    return (
      <Screen>
        <Header title="Accounts" backBtn />
        <ScrollView scrollEnabled={scroll}>
          <View style={{ borderColor: "gray", borderTopWidth: 1 }}>
            {accounts.map(account => (
              <Swipeable
                key={account.id}
                renderRightActions={() => this.renderDeleteButton(account)}
                containerStyle={styles.swiperWrap}
              >
                <RectButton onPress={() => navigation.navigate("AccountEdit", { id: account.id })}>

                  <View key={account.id} style={[styles.wrap, darkMode && styles.wrapDark]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Icon type={account.icon} style={{ marginRight: 10 }} textStyle={{ color: account.color, fontSize: 20 }} />
                      <Copy>
                        {`${account.name} `}
                        <Copy style={{ fontSize: 12 }}>{`(${formatCurrency(accountBalance(account, transactions), account.currency)})`}</Copy>
                      </Copy>
                      {
                        account.defaultAccount
                        && <Icon type="star" textStyle={{ color: "orange", fontSize: 10 }} />
                      }
                    </View>

                    <RectButton onPress={() => {
                      navigation.navigate("AccountEdit")
                    }}>
                      <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
                    </RectButton>

                  </View>

                </RectButton>
              </Swipeable>
            ))}
          </View>

        </ScrollView>

        <Footer>
          <View style={[{ alignItems: "center" }, isAndroid && { paddingBottom: 10 }]}>
            <BorderlessButton
              onPress={() => navigation.navigate("AccountEdit")}>
              <CopyBlue>Add new account</CopyBlue>
            </BorderlessButton>
          </View>
        </Footer>

      </Screen>
    )
  }
}


export default Accounts
