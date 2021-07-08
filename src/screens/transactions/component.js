import React, { Component } from "react"
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  SectionList,
} from "react-native"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"

import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import Transaction from "../../components/transaction"
import { Copy } from "../../components/typography"
import palette from "../../utils/palette"

import styles from "./styles"

class Transactions extends Component {
  static contextType = DarkModeContext

  state = {
    height: new Animated.Value(0),
    searchTerm: "",
  }

  componentDidMount() {
    this.scrollView &&
      setTimeout(
        () => this.scrollView.scrollTo({ x: 0, y: 0, animated: false }),
        100,
      )
  }

  render() {
    const { height, searchTerm } = this.state
    const {
      navigation,
      accountFilter,
      categoryFilter,
      openDrawer,
      appliedLabelsFilter,
      entries,
      theme,
    } = this.props
    const darkMode =
      theme === "system" ? this.context === "dark" : theme === "dark"
    const filtersApplied =
      accountFilter || categoryFilter || appliedLabelsFilter.length || false

    const headerHeight = height.interpolate({
      inputRange: [0, 50, 120],
      outputRange: [80, 80, 60],
      extrapolate: "clamp",
    })

    const headerScale = height.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [2.7, 1, 1],
    })

    const transactions = entries
      .filter(item => {
        if (!accountFilter) {
          return true
        }
        if (!get(item, "account")) {
          return true
        }
        return get(item, "accountId") === accountFilter.id
      })
      .filter(item => {
        if (!categoryFilter) {
          return true
        }
        return get(item, "categoryId") === categoryFilter.id
      })
      .filter(item => {
        if (appliedLabelsFilter.length === 0) {
          return true
        }
        if (!item.labels.length) {
          return false
        }

        let hasFilterLabel = false
        item.labels.forEach(label => {
          if (appliedLabelsFilter.find(filter => filter.id === label.id)) {
            hasFilterLabel = true
          }
        })
        return hasFilterLabel
      })
      .filter(item => {
        if (searchTerm === "") {
          return true
        }
        return item.note.includes(searchTerm)
      })
    //.reverse()

    const sectionsList = transactions
      .reduce((sections, transaction) => {
        const date = new Date(transaction.timestamp)
        const sectionTitle = date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
        const transactionDate = date.toLocaleDateString("en-US", {
          month: "numeric",
          year: "numeric",
        })
        const sectionIdx = sections.findIndex(s => s.date == transactionDate)
        if (sectionIdx > -1) {
          sections[sectionIdx].data.push(transaction)
        } else {
          sections.push({
            date: transactionDate,
            data: [transaction],
            title: sectionTitle,
          })
        }
        return sections
      }, [])
      .map(section => ({
        date: section.date,
        title: section.title,
        data: section.data.sort((a, b) => a.timestamp < b.timestamp),
      }))
      .sort((a, b) => a.date < b.date)

    console.log(sectionsList)

    return (
      <Screen>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            width: "100%",
            flex: 1,
          }}>
          <Header
            title="Transactions"
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ position: "absolute", right: 10, bottom: 5 }}>
              <Icon
                type="filter"
                style={{ backgroundColor: "transparent" }}
                textStyle={{
                  fontSize: 12,
                  color: filtersApplied ? "black" : "white",
                }}
              />
            </TouchableOpacity>
          </Header>
        </View>

        <Animated.View
          style={{
            justifyContent: "center",
            zIndex: 100,
            position: "absolute",
            left: 0,
            width: "100%",
            backgroundColor: darkMode ? palette.darkGray : palette.blue,
            overflow: "hidden",
            transform: [{ scale: headerScale }],
            height: headerHeight,
          }}
        />

        {!entries.length ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              margin: 20,
            }}>
            <Copy style={{ textAlign: "center" }}>
              Hey! Seems like you don&apos;t have any transactions.
            </Copy>
            <Copy />
            <Copy>Add some!</Copy>
          </View>
        ) : (
          <SectionList
            style={[
              { marginTop: 80, backgroundColor: "white" },
              darkMode && { backgroundColor: palette.dark },
            ]}
            sections={sectionsList}
            initialNumToRender={20}
            ListHeaderComponent={() => (
              <View
                style={[styles.searchWrap, darkMode && styles.searchWrapDark]}>
                <View
                  style={[
                    styles.searchInnerWrap,
                    darkMode && styles.searchInnerWrapDark,
                  ]}>
                  <Icon
                    type="search"
                    style={{ backgroundColor: "transparent" }}
                    textStyle={{ color: "teal" }}
                  />
                  <TextInput
                    style={[
                      styles.searchText,
                      darkMode && styles.searchTextDark,
                    ]}
                    placeholder="search by note, category,..."
                    placeholderTextColor="gray"
                    onChangeText={text => this.setState({ searchTerm: text })}
                  />
                </View>
              </View>
            )}
            renderSectionHeader={({ section: { date, title } }) => (
              <View style={[styles.section, darkMode && styles.sectionDark]}>
                <Copy>{title}</Copy>
              </View>
            )}
            renderItem={({ item }) => (
              <Transaction
                key={item.id}
                transaction={item}
                toggleScroll={val => this.setState({ scrollEnabled: val })}
                navigation={navigation}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </Screen>
    )
  }
}

export default Transactions
