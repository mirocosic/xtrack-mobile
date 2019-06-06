import React, { Component } from "react"
import { Animated, View, ScrollView, TouchableOpacity, Alert } from "react-native"
import PropTypes from "prop-types"
import { withNavigation } from "react-navigation"
import { get } from "lodash"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import Transaction from "../../components/transaction"
import AddTransaction from "../../components/add-transaction"
import { Copy } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

const HEADER_MAX_HEIGHT = 150
const HEADER_MIN_HEIGHT = 80
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class Transactions extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="exchangeAlt" />
    ),
  })

  state = {
    height: new Animated.Value(0),
    scrollEnabled: true,
  }

  changeAccountFilter = () => {
    const { accounts, changeAccountFilter } = this.props
    Alert.alert(
      __("Select account"),
      __("Please choose account"),
      [
        ...accounts.map(account => (
          { text: account.name, onPress: () => changeAccountFilter(account) }
        )),
        { text: "All accounts", onPress: () => changeAccountFilter(false) },
      ],
    )
  }

  render() {
    const { height, scrollEnabled } = this.state
    const {
      expenses, income, total, accountFilter,
      entries, navigation, clearSelectedCategory, clearTransactionForm,
    } = this.props
    const headerHeight = height.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    const headerScale = height.interpolate({
      inputRange: [-150, 0],
      outputRange: [3, 1],
      extrapolate: "clamp",
    });

    return (
      <Screen>
        <Animated.View style={{
          justifyContent: "center",
          backgroundColor: "teal",
          overflow: "hidden",
          transform: [{ scale: headerScale }],
          height: headerHeight,
        }}>
          <Header title="Transactions">
            <View style={styles.overview}>
              <View>
                <Copy style={{ color: "white" }}>{__("Expenses")}: {formatCurrency(expenses)}</Copy>
                <Copy style={{ color: "white" }}>{__("Income")}: {formatCurrency(income)}</Copy>
                <Copy style={{ color: "white" }}>{__("Total")}: {formatCurrency(total)}</Copy>
              </View>

              <TouchableOpacity onPress={this.changeAccountFilter}>
                <Copy style={{ color: "white" }}>Account: {accountFilter.name || "All accounts"}</Copy>
              </TouchableOpacity>
            </View>
          </Header>
        </Animated.View>

        <ScrollView
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: height } } }])}>

          <View>
            {entries
              .filter((item) => {
                if (!accountFilter) { return true }
                if (!get(item, "account")) { return true }
                return get(item, "account.id") === accountFilter.id
              })
              .map(value => (
                <Transaction
                  key={value.id}
                  transaction={value}
                  toggleScroll={val => this.setState({ scrollEnabled: val })} />))
              .reverse()}
          </View>

        </ScrollView>

        <AddTransaction />
      </Screen>
    )
  }
}

Transactions.propTypes = {
  expenses: PropTypes.number.isRequired,
  clearTransactionForm: PropTypes.func.isRequired,
}

export default withNavigation(Transactions);
