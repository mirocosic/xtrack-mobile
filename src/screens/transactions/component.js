import React, { Component } from "react"
import { Animated, View, ScrollView, TouchableOpacity, TextInput } from "react-native"
import PropTypes from "prop-types"
import { withNavigation } from "react-navigation"
import { get } from "lodash"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import Transaction from "../../components/transaction"
import { Copy } from "../../components/typography"

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

  componentDidMount(){
    setTimeout(() => this.scrollView.scrollTo({ x: 0, y: 60, animated: false }), 100)
  }

  render() {
    const { height, scrollEnabled } = this.state
    const {
      expenses, income, total, accountFilter, categoryFilter, openDrawer, appliedLabelsFilter,
      entries, navigation, clearSelectedCategory, clearTransactionForm,
    } = this.props

    const filtersApplied = accountFilter || categoryFilter || appliedLabelsFilter.length || false;

    const headerHeight = height.interpolate({
      inputRange: [-100, 0, 50],
      outputRange: [200, 100, 50],
    });

    const headerScale = height.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [4, 1, 1],
    });

    return (
      <Screen>
        <View style={{ position: "absolute", alignItems: "center", justifyContent: "center", zIndex: 1000, width: "100%", flex: 1 }}>
          <Header title="Transactions" style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => openDrawer()} style={{ position: "absolute", right: 10, top: 30 }}>
              <Icon type="filter" style={{ backgroundColor: "transparent" }} textStyle={{ color: filtersApplied ? "blue" : "white" }} />
            </TouchableOpacity>
          </Header>
        </View>

        <Animated.View style={{
          justifyContent: "center",
          backgroundColor: "teal",
          overflow: "hidden",
          transform: [{ scale: headerScale }],
          height: 80,
        }}>

        </Animated.View>

        {
          !entries.length && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Copy>Hey! Seems like you don't have any transactions.</Copy>
            <Copy>Add some!</Copy>
          </View>
          )
        }

        <ScrollView
          ref={ref => this.scrollView = ref}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: height } } }])}>
          <View >
            <View style={{height: 60, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "white", borderBottomWidth: 1, borderColor: "gray"}}>
              <View style={{backgroundColor: "#e6e6e6", flexDirection: "row", flex: 1, margin: 20, borderRadius: 10}}>
                <Icon type="search" style={{ backgroundColor: "transparent" }} textStyle={{ color: "teal" }} />
                <TextInput
                  style={{backgroundColor: "#e6e6e6", paddingTop: 10, paddingBottom: 10, paddingRight: 20, paddingLeft: 20}}
                  placeholder="search by note, category,..."
                />
              </View>

            </View>
            {entries
              .filter((item) => {
                if (!accountFilter) { return true }
                if (!get(item, "account")) { return true }
                return get(item, "account.id") === accountFilter.id
              })
              .filter((item) => {
                if (!categoryFilter) { return true }
                return get(item, "category.id") === categoryFilter.id
              })
              .filter((item) => {
                if (appliedLabelsFilter.length === 0) { return true }
                if (!item.labels.length) { return false }

                let hasFilterLabel = false
                item.labels.forEach((label) => {
                  if (appliedLabelsFilter.find(filter => filter.id === label.id)) {
                    hasFilterLabel = true
                  }
                })
                return hasFilterLabel
              })
              .map(value => (
                <Transaction
                  key={value.id}
                  transaction={value}
                  toggleScroll={val => this.setState({ scrollEnabled: val })} />))
              .reverse()}
          </View>

        </ScrollView>

      </Screen>
    )
  }
}

Transactions.propTypes = {
  expenses: PropTypes.number.isRequired,
  clearTransactionForm: PropTypes.func.isRequired,
}

export default withNavigation(Transactions);
