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
      <Icon type="trash-alt" />
    </View>
  );

  renderEditButton = () => (
    <View style={styles.editButton}>
      <Icon style={{ backgroundColor: "blue" }} />
      <Copy style={{ color: "white" }}>Edit</Copy>
    </View>
  )

  handleDelete = (account) => {
    const { remove, transactions } = this.props
    const count = transactions.filter((item) => account.id === get(item ,"account.id")).length
    if (count > 0) {
      Alert.alert("Warning", "Cannot delete account that contains transactions.")
    } else {
      remove(account)
    }
  }

  render() {
    const { scroll } = this.state
    const { navigation, darkMode, accounts, transactions } = this.props
    return (
      <Screen>
        <Header title="Accounts" backBtn />
        <ScrollView scrollEnabled={scroll}>
          <View style={{ borderColor: "gray", borderTopWidth: 1 }}>
            {accounts.map(account => (
              <Swipeout
                key={account.id}
                right={[{
                  backgroundColor: "#f8f8fc",
                  component: this.renderDeleteButton(),
                  onPress: () => this.handleDelete(account),
                }]}
                style={styles.swiperWrap}
                sensitivity={10}
                buttonWidth={70}
                backgroundColor="#f8f8fc"
                scroll={value => this.setState({ scroll: value })}
              >
                <TouchableOpacity onPress={() => navigation.navigate("AccountEdit", { id: account.id })}>

                  <View key={account.id} style={[styles.wrap, darkMode && styles.wrapDark]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Icon type={account.icon} style={{ marginRight: 10 }} textStyle={{ color: account.color, fontSize: 20 }} />
                      <Copy>
                        {`${account.name} `}
                        <Copy style={{fontSize: 12}}>{`(${formatCurrency(accountBalance(account, transactions))})`}</Copy>
                      </Copy>
                      {
                        account.defaultAccount &&
                        <Icon type="star" textStyle={{ color: "orange", fontSize: 10 }} />
                      }
                    </View>

                    <TouchableOpacity onPress={() => {
                      //selectCategory(cat)
                      navigation.navigate("AccountEdit")
                    }}>
                      <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
                    </TouchableOpacity>

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
  remove: PropTypes.func.isRequired,
  //navigation: PropTypes.instanceOf("Navigation").isRequired,
}

Accounts.defaultProps = {
  darkMode: false,
  transactions: [],
  accounts: [],
}

export default withNavigation(Accounts);
