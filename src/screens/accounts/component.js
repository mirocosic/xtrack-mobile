import React, { Component } from "react"
import { Alert, View, ScrollView, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { get } from "lodash"
import { withNavigation } from "react-navigation";
import Swipeout from "react-native-swipeout"
import { Screen, Header, Footer } from "../../components"
import { Copy } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"
import { formatCurrency } from "../../utils/currency"


const accountBalance = (account, transactions) => {
  if (transactions.length === 0) return 0;

  const accountTransactions = transactions.filter(item => account.id === get(item, "account.id"));

  if (accountTransactions.length === 0) { return 0 }

  const total = accountTransactions.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));

  return total.amount;
}

class Accounts extends Component {

  state = {
    name: "",
    scroll: true,
  }


  renderDeleteButton = () => (
    <View style={styles.deleteButton}>
      <Icon style={{ backgroundColor: "red" }} />
      <Copy style={{ color: "white" }}>Delete</Copy>
    </View>
  );

  renderEditButton = () => (
    <View style={styles.editButton}>
      <Icon style={{ backgroundColor: "blue" }} />
      <Copy style={{ color: "white" }}>Edit</Copy>
    </View>
  )

  handleDelete = (id) => {
    const count = this.props.transactions.filter((item) => id === get(item ,"account.id")).length
    if ( count > 0 ) {
      Alert.alert("Warning", "Cannot delete account that contains transactions.")
    } else {
      this.props.deleteAccount(id)
    }
  }

  render() {
    const { name, scroll } = this.state
    const { navigation, darkMode, add, setFrom, setTo, accounts, transactions, deleteAccount } = this.props
    return (
      <Screen>
        <Header title="Accounts" backBtn />
        <ScrollView scrollEnabled={scroll}>
          <View>
            {accounts.map(account => (
              <Swipeout
                key={account.id}
                right={[{
                  backgroundColor: "#f8f8fc",
                  component: this.renderDeleteButton(),
                  onPress: () => this.handleDelete(account.id),
                }]}
                style={{ borderBottomWidth: 1, borderColor: "gray" }}
                sensitivity={10}
                buttonWidth={70}
                backgroundColor="#f8f8fc"
                scroll={value => this.setState({ scroll: value })}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AccountEdit", { id: account.id })
                    //navigation.state.params.accountField === "from" ? setFrom(account) : setTo(account)
                    //navigation.goBack()
                  }}>

                  <View key={account.id} style={[styles.wrap, darkMode && styles.wrapDark]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Icon type={account.icon} style={{ marginRight: 10, backgroundColor: account.color }} />
                      <Copy>{`${account.name} (${formatCurrency(accountBalance(account, transactions))})`}</Copy>
                    </View>
                  </View>

                </TouchableOpacity>
              </Swipeout>
            ))}
          </View>

        </ScrollView>

        <Footer>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AccountEdit")}>
              <Copy style={{ color: "teal" }}>Add new account</Copy>
            </TouchableOpacity>
          </View>
        </Footer>

      </Screen>
    )
  }
}

Accounts.propTypes = {
  darkMode: PropTypes.bool,
  transactions: PropTypes.any,
  // accounts: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  // })),
  add: PropTypes.func.isRequired,
  setFrom: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  setTo: PropTypes.func.isRequired,
  //navigation: PropTypes.instanceOf("Navigation").isRequired,
}

Accounts.defaultProps = {
  darkMode: false,
  transactions: [],
  accounts: [],
}

export default withNavigation(Accounts);
