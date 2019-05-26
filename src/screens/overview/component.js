import React, { Component } from "react"
import { View, Text } from "react-native"

import { withNavigation } from "react-navigation"
import Screen from "../../components/screen"
import Header from "../../components/header"

import styles from "./styles"

class Overview extends Component {

  state = {}

  render() {
    console.log(this.props.transactions)
    return (
      <Screen>
        <Header title="Overview" />
        <View style={styles.wrap}>
          <View style={styles.row}>
            <Text>Income</Text>
            <Text>1000 kn</Text>
          </View>

          <View style={styles.row}>
            <Text>Expenses</Text>
            <Text>500 kn</Text>
          </View>

          <View style={styles.breakdownWrap}>
            <View style={{...styles.row, paddingLeft: 20}}>
              <Text>Category</Text>
              <Text>45 kn </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text>Balance</Text>
            <Text>10000</Text>
          </View>


        </View>
      </Screen>
    )
  }
}

export default withNavigation(Overview)
