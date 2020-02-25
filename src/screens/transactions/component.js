import React, { Component } from "react"
import { Animated, View, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { withNavigation } from "react-navigation"
import { get } from "lodash"
import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import Transaction from "../../components/transaction"
import { Copy } from "../../components/typography"
import palette from "../../utils/palette"

import styles from "./styles"

class Transactions extends Component {

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon style={{ backgroundColor: "white" }} textStyle={{ fontSize: 26, color: tintColor }} type="exchangeAlt" />
    ),
  })

  state = {
    height: new Animated.Value(0),
    scrollEnabled: true,
    searchTerm: "",
  }

  componentDidMount() {
    this.scrollView && setTimeout(() => this.scrollView.scrollTo({ x: 0, y: 60, animated: false }), 100)
  }

  render() {
    const { height, scrollEnabled, searchTerm } = this.state
    const { accountFilter, categoryFilter, openDrawer, appliedLabelsFilter, entries } = this.props

    const filtersApplied = accountFilter || categoryFilter || appliedLabelsFilter.length || false;

    const headerHeight = height.interpolate({
      inputRange: [0, 50, 120],
      outputRange: [80, 80, 60],
      extrapolate: "clamp",
    });

    const headerScale = height.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [2.7, 1, 1],
    });

    return (
      <Screen>
        <View style={{ position: "absolute", alignItems: "center", justifyContent: "center", zIndex: 1000, width: "100%", flex: 1 }}>
          <Header title="Transactions" style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => openDrawer()} style={{ position: "absolute", right: 10, bottom: 5 }}>
              <Icon type="filter" style={{ backgroundColor: "transparent" }} textStyle={{ fontSize: 12, color: filtersApplied ? "black" : "white" }} />
            </TouchableOpacity>
          </Header>
        </View>
        <Animated.View style={{
          justifyContent: "center",
          zIndex: 100,
          position: "absolute",
          left: 0,
          width: "100%",
          backgroundColor: palette.blue,
          overflow: "hidden",
          transform: [{ scale: headerScale }],
          height: headerHeight,
        }} />

        {
          !entries.length
            ? (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 20 }}>
                <Copy style={{ textAlign: "center" }}>Hey! Seems like you don&apos;t have any transactions.</Copy>
                <Copy />
                <Copy>Add some!</Copy>
              </View>
            )
            : (
              <ScrollView
                contentContainerStyle={{ paddingTop: 80 }}
                ref={(ref) => { this.scrollView = ref }}
                scrollEnabled={scrollEnabled}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: height } } }])}
              >
                <View>

                  <View style={styles.searchWrap}>
                    <View style={styles.searchInnerWrap}>
                      <Icon type="search" style={{ backgroundColor: "transparent" }} textStyle={{ color: "teal" }} />
                      <TextInput
                        style={styles.searchText}
                        placeholder="search by note, category,..."
                        onChangeText={text => this.setState({ searchTerm: text })}
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
                    .filter((item) => {
                      if (searchTerm === "") { return true }
                      return item.note.includes(searchTerm)
                    })
                    .map(value => (
                      <Transaction
                        key={value.id}
                        transaction={value}
                        toggleScroll={val => this.setState({ scrollEnabled: val })} />))
                    .reverse()}
                </View>
              </ScrollView>
            )
        }

      </Screen>
    )
  }
}

export default withNavigation(Transactions);
