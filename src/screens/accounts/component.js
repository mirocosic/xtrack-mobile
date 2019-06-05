import React, { Component } from "react"
import { Text, View, ScrollView, TextInput, Button, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { get } from "lodash"
import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"


const accountBalance = (account, transactions) => {
  if (transactions.length === 0) return 0;

  const accountTransactions = transactions.filter(item => account.id === get(item, "account.id"));

  if (accountTransactions.length === 0) { return 0 }

  const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));

  return total.amount;
}

class Accounts extends Component {

  state = { name: "" }

  render() {
    const { name } = this.state
    const { navigation, darkMode, add, setFrom, setTo, accounts, transactions, deleteAccount } = this.props
    return (
      <Screen>
        <Header title="Accounts" backBtn={true} backBtnPress={() => navigation.goBack()} />
        <ScrollView>
          <View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => this.setState({ name: text })}
                placeholder="new account"
                value={name} />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  this.setState({ name: "" })
                  add(name)
                }}>
                <Copy style={{ color: "white" }}>Add</Copy>
              </TouchableOpacity>
            </View>

            {accounts.map(account => (
              <TouchableOpacity
                key={account.id}
                onPress={() => {
                  navigation.state.params.accountField === "from" ? setFrom(account) : setTo(account)
                  navigation.goBack()
                }}>

                <View key={account.id} style={[styles.wrap, darkMode && styles.wrapDark]}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon icon="money" style={{ marginRight: 10 }} />
                    <Copy>{`${account.name} - ${accountBalance(account, transactions)}`}</Copy>
                  </View>

                  <TouchableOpacity style={styles.delete} onPress={() => deleteAccount(account.id)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>

            ))}
          </View>
          <Button title="Select" onPress={() => navigation.navigate("EntryForm")} />
        </ScrollView>
      </Screen>
    )
  }
}

Accounts.propTypes = {
  darkMode: PropTypes.bool,
  transactions: PropTypes.arrayOf(),
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  add: PropTypes.func.isRequired,
  setFrom: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  setTo: PropTypes.func.isRequired,
  navigation: PropTypes.instanceOf("Navigation").isRequired,
}

Accounts.defaultProps = {
  darkMode: false,
  transactions: [],
  accounts: [],
}

export default withNavigation(Accounts);
