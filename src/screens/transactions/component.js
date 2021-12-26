import React, { Component } from "react"
import { Animated, View, TouchableOpacity } from "react-native"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"

import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import Transaction from "../../components/transaction"
import { Copy } from "../../components/typography"
import palette from "../../utils/palette"
import { safePaddingBottom } from "../../utils/ui-utils"

import transactionsHeader from "../../../assets/images/transactions-header.png"
import styles from "./styles"

const hasFilterLabel = (item, appliedLabelsFilter) => {
  if (!item.labels.length) { return false }
  let hasFilterLabel = false
  item.labels.forEach(label => {
    if (appliedLabelsFilter.find(filter => filter.id === label.id)) {
      hasFilterLabel = true
    }
  })
  return hasFilterLabel
}

class Transactions extends Component {
  static contextType = DarkModeContext

  scrollView = React.createRef()
  scrollY = new Animated.Value(0)

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
        navigation={this.props.navigation}/>
    )
  }

  render() {
    const { searchTerm } = this.state
    const { navigation, accountFilter, categoryFilter, appliedLabelsFilter, entries, theme, allTrans } = this.props
    const darkMode = theme === "system" ? this.context === "dark" : theme === "dark"
    const filtersApplied = accountFilter || categoryFilter || appliedLabelsFilter.length || false

    const transactions = entries
      .filter(item => allTrans ? true : !item.isTransfer)
      .filter(item => !accountFilter || !get(item, "account") || get(item, "accountId") === accountFilter.id)
      .filter(item => !categoryFilter || get(item, "categoryId") === categoryFilter.id)
      .filter(item => appliedLabelsFilter.length === 0 || hasFilterLabel(item, appliedLabelsFilter))
      .filter(item => searchTerm === "" || (item.note && item.note.toLowerCase().includes(searchTerm.toLowerCase())))

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
        <Animated.View style={{ position: "relative", zIndex: 100, width: "100%"}}>
          <Header
            title="Transactions"
            withInsets
            style={{  width: "100%", alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ position: "absolute", right: 10, bottom: 5 }}>
              <Icon
                type="filter"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ fontSize: 12, color: filtersApplied ? palette.red : palette.light}}/>
            </TouchableOpacity>
          </Header>
        </Animated.View>

        {!entries.length ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 20,}}>
            <Copy style={{ textAlign: "center" }}>Hey! Seems like you don&apos;t have any transactions.</Copy>
            <Copy>Add some!</Copy>
          </View>
        ) : (
          <View style={{ paddingTop: 0}}>
            <View style={[{position: "absolute", width: "100%", height: 200, top: -20},
                          {backgroundColor: darkMode ? palette.darkGray : palette.blue}]}>
              <Animated.Image source={transactionsHeader} resizeMode="contain"
                   style={[{backgroundColor: darkMode ? palette.darkGray : palette.blue},
                           {position: "absolute", width: "100%", height: 200},
                           {opacity: this.scrollY.interpolate({inputRange: [0, 100], outputRange: [1, 0]})},
                           {transform: [{ translateY: this.scrollY.interpolate({inputRange: [-100, 0, 100], outputRange:[50, 0, 0], extrapolateRight: "clamp"})},
                                        { scaleX: this.scrollY.interpolate({inputRange: [-100, 0], outputRange:[1.4, 1], extrapolateRight: "clamp"})},
                                        { scaleY: this.scrollY.interpolate({inputRange: [-100, 0], outputRange:[1.4, 1], extrapolateRight: "clamp"})}]}]}/>
            </View>

            {/* <View style={[styles.searchWrap, darkMode && styles.searchWrapDark]}>
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
            </View> */}
            
            <Animated.SectionList
              contentContainerStyle={{paddingBottom: safePaddingBottom(110), paddingTop: 160 }}
              sections={sectionsList}
              initialNumToRender={20}
              renderSectionHeader={({ section: { date, title } }) => (
                <View style={[styles.section, darkMode && styles.sectionDark]}>
                  <Copy>{title}</Copy>
                </View>
              )}
              renderSectionFooter={() => (
                <View style={{borderBottomWidth: 1, borderColor: palette.gray}}/>
              )}
              ItemSeparatorComponent={() => (<View style={styles.separator} />)}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: true })}/>

          </View>
        )}
      </Screen>
    )
  }
}

export default Transactions
