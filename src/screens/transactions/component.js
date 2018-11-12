import React, {Component} from 'react';
import {Platform, Animated, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Alert} from 'react-native';

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import Icon from "../../components/icon"
import Transaction from "../../components/transaction"
import { Copy, Title } from "../../components/typography"
import __ from "../../utils/translations"
import { formatCurrency } from "../../utils/currency"
import { get } from "lodash"

import styles from  "./styles"

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Transactions extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon style={{backgroundColor: "white"}} textStyle={{fontSize: 26, color: tintColor}} type="exchangeAlt" />
      )
    }
  }

  state = {
    height: new Animated.Value(0)
  }

  changeAccountFilter = () => {
    Alert.alert(
      __("Select account"),
      __("Please choose account"),
      [
        ...this.props.accounts.map((account)=>{
          return {text: account.name, onPress: ()=>this.props.changeAccountFilter(account)}
        }),
        {text: "All accounts", onPress: ()=>this.props.changeAccountFilter(false)}
      ]
    )
  }

  render(){
    const headerHeight = this.state.height.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerScale = this.state.height.interpolate({
        inputRange: [-150, 0],
          outputRange: [3, 1],
          extrapolate: 'clamp',
    });

    return(
      <Screen>
        <Animated.View style={{
            justifyContent: "center",
            backgroundColor: "teal",
            overflow: 'hidden',
            transform: [{scale: headerScale}],
            height: headerHeight, backgroundColor:"teal"}}>
          <Header title="Transactions">
            <View style={styles.overview}>
              <View>
                <Copy style={{color: "white"}}>{__("Expenses")}: {formatCurrency(this.props.expenses)}</Copy>
                <Copy style={{color: "white"}}>{__("Income")}: {formatCurrency(this.props.income)}</Copy>
                <Copy style={{color: "white"}}>{__("Total")}: {formatCurrency(this.props.total)}</Copy>
              </View>

              <TouchableOpacity onPress={this.changeAccountFilter}>
                <Copy style={{color: "white"}}>Account: {this.props.accountFilter.name || "All accounts"}</Copy>
              </TouchableOpacity>
            </View>
          </Header>
        </Animated.View>

        <ScrollView
          scrollEnabled={this.state.scrollEnabled}
          scrollEventThrottle={16}
          onScroll={Animated.event(
           [{ nativeEvent: {
                contentOffset: {
                  y: this.state.height
                }
              }
            }]
         )}>




          <View>

            {this.props.entries
              .filter((item)=>{
                if (!this.props.accountFilter) {return true}
                if (!get(item, "account")) {return true}
                return get(item, "account.id") === this.props.accountFilter.id
              })
              .map((value)=>(<Transaction key={value.id} transaction={value}/> ))
              .reverse()}
          </View>

        </ScrollView>
        <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate("TransactionForm")
            this.props.clearSelectedCategory()
            this.props.clearTransactionForm()
          }}
          style={styles.addButton}>
          <Icon style={{backgroundColor: "teal", width: 50, height:50, borderRadius:25}} textStyle={{fontSize: 30}} type="plus" />
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default withNavigation (Transactions);
