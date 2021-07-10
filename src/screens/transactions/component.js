import React, { Component } from "react"
import { Animated, Text, View, SafeAreaView, TouchableOpacity, TextInput, SectionList } from "react-native"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"

import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import Transaction from "../../components/transaction"
import { Copy } from "../../components/typography"
import palette from "../../utils/palette"
import { safePaddingBottom } from "../../utils/ui-utils"

import styles from "./styles"

class Transactions extends Component {
  static contextType = DarkModeContext

  scrollView = React.createRef()

  state = {
    height: new Animated.Value(0),
    searchTerm: "",
  }

  renderItem = ({ item }) => {
    return (
      <Transaction
        key={item.id}
        transaction={item}
        toggleScroll={val => this.setState({ scrollEnabled: val })}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    const { searchTerm } = this.state
    const { navigation, accountFilter, categoryFilter, appliedLabelsFilter, entries, theme } = this.props
    const darkMode = theme === "system" ? this.context === "dark" : theme === "dark"
    const filtersApplied = accountFilter || categoryFilter || appliedLabelsFilter.length || false

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
        return item.note && item.note.toLowerCase().includes(searchTerm.toLowerCase())
      })

    const sectionsList = transactions
      .reduce((sections, transaction) => {
        const date = new Date(transaction.timestamp)
        const sectionTitle = date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
        const transactionDate = date.toISOString().split("-")[0] + date.toISOString().split("-")[1]
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

    return (
      <Screen>
          <Header
            title="Transactions"
            style={{  width: "100%", alignItems: "center", justifyContent: "center", }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ position: "absolute", right: 10, bottom: 5 }}>
              <Icon
                type="filter"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ fontSize: 12, color: filtersApplied ? "black" : "white",}}/>
            </TouchableOpacity>
          </Header>

       
        {!entries.length ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 20,}}>
            <Copy style={{ textAlign: "center" }}>
              Hey! Seems like you don&apos;t have any transactions.
            </Copy>
            <Copy />
            <Copy>Add some!</Copy>
          </View>
        ) : (
          <View>
            <View style={[styles.searchWrap, darkMode && styles.searchWrapDark]}>
              <View style={[ styles.searchInnerWrap, darkMode && styles.searchInnerWrapDark,]}>
                <Icon
                  type="search"
                  style={{ backgroundColor: "transparent" }}
                  textStyle={{ color: "teal" }}/>
                <TextInput
                  style={[ styles.searchText, darkMode && styles.searchTextDark ]}
                  value={this.state.searchTerm}
                  placeholder="search by note, category,..."
                  placeholderTextColor="gray"
                  onChangeText={(text) => this.setState({searchTerm: text})}
                  clearButtonMode="while-editing"/>
              </View>
            </View>
            <SectionList
              style={[{ backgroundColor: palette.light }, darkMode && { backgroundColor: palette.dark }]}
              contentContainerStyle={{paddingBottom: safePaddingBottom(110)}}
              sections={sectionsList}
              initialNumToRender={20}
              renderSectionHeader={({ section: { date, title } }) => (
                <View style={[styles.section, darkMode && styles.sectionDark]}>
                  <Copy>{title}</Copy>
                </View>
              )}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </Screen>
    )
  }
}

export default Transactions
