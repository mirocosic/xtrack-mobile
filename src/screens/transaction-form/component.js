import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"
import SelectBox from "../../components/select-box"
import AnimatedAmount from "../../components/animated-amount"
import Icon from "../../components/icon"
import Label from "../../components/label"
import __ from "../../utils/translations"
import {formatCurrency} from "../../utils/currency"
import moment from "moment";
import { get } from "lodash"
import styles from "./styles"

import AnimateNumber from 'react-native-animate-number'

class TransactionForm extends Component<Props> {

  state = {
    timestamp: moment.now(),
    amount: 0,
    note: "Vino i cigare...",
    type: "expense",
    category: {},
    account: {},
    labels: []
  }

  componentDidMount = () => {

    this.props.clearSelectedCategory()

    if (this.props.selectedTransaction) {

      this.setState(this.props.selectedTransaction);

     }

  }
  //
  componentWillReceiveProps = (nextProps) => {
    this.setState(nextProps.selectedTransaction);
  }

  removeLabel = (removedLabel) => {
     this.setState({
       labels: this.state.labels.filter((label)=>label.id !== removedLabel.id)
     })
  }

  render() {

    return (
      <Screen style={{paddingLeft: 0, paddingRight: 0}}>
        <Title style={styles.welcome}>Enter your expense now!</Title>
        <ScrollView contentContainerStyle={styles.wrap}>

          <Title>This is your </Title>

          <SelectBox
            selected={this.props.navigation.state.params && this.props.navigation.state.params.transaction.type}
            onPress={(type)=>{
              this.props.setTransferMode(type === "transfer")
              this.props.setType(type)
            }}/>

        <View>

          <Title>{ "on " + moment(this.state.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Title>
        </View>

        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Title>in category</Title>

            { this.state.type !== "transfer" &&
              <View>
                <TouchableOpacity
                  style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
                  onPress={()=>this.props.navigation.navigate("Categories")}>
                  <Icon style={{marginRight: 10}}/>
                  <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>
                    { get(this.props.selectedCategory , "name") ||
                      get(this.state, "category.name", "select") }
                  </Text>
                </TouchableOpacity>
              </View>
          }
        </View>

        <View style={{flexDirection: "row", alignItems: "flex-end"}}>
          <Title>You have spent</Title>
          <Title style={{color: "gray", backgroundColor: "white"}}>

          <AnimateNumber
            value={this.state.amount}
            timing="easeOut"
            interval={18}
            steps={ 23 }
            formatter={(val)=>formatCurrency(val)}/>
          </Title>
          {
            // <TextInput
            //     onChangeText={(value) => this.setState({amount: value})}
            //     value={ this.state.amount}
            //     style={ [ styles.amountInput, this.props.darkMode && styles.amountInputDark ]}
            //     placeholder="0,00 kn"
            //     keyboardAppearance={this.props.darkMode ? "dark" : "light"}
            //     keyboardType="numeric"
            //     returnKeyType="done"
            // />
          }
        </View>

        { this.state.type === "transfer" &&
          <View>
            <Title>From Account:</Title>
              <TouchableOpacity
                style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
                onPress={()=>this.props.navigation.navigate("Accounts", {accountField: "from"})}>
                <Icon icon="money" style={{marginRight: 10}}/>
                  <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>
                    {this.props.fromAccount.name}
                  </Text>

              </TouchableOpacity>
          </View>
        }

        <Title>{this.state.type === "transfer" && "To "}Account</Title>
        <TouchableOpacity
          style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
          onPress={()=>this.props.navigation.navigate("Accounts", {accountField: "to"})}>
          <Icon icon="money" style={{marginRight: 10}}/>
          <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>

            {this.props.toAccount.name}
          </Text>
        </TouchableOpacity>

        <Title>Note about this:</Title>
          <TextInput
              onChangeText={(value) => this.setState({note: value})}
              value={this.state.note}
              style={this.props.darkMode ? styles.textInputDark : styles.textInput}
              placeholder="note"
              returnKeyType="done"
              keyboardAppearance={this.props.darkMode ? "dark" : "light"}
          />

          <Copy>Labels</Copy>

          <View style={ styles.labels }>

            {this.state.labels.map((label)=>{

              return(
                <Label label={label} removeLabel={()=>this.removeLabel(label)}/>
              )
            }

          )}
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("Labels")}>
              <Title>+</Title>
          </TouchableOpacity>

        </View>
          <Button title="Done!" onPress={()=>{
              const transaction = {
                timestamp: this.state.timestamp,
                account: this.props.toAccount,
                type: this.state.type,
                amount: this.state.type === "expense" ? -this.state.amount : this.state.amount,
                note: this.state.note,
                category: this.state.category,

                labels: this.state.labels
              }
              if (this.state.id){
                this.props.edit({...transaction, ...{id: this.state.id}})
              } else {
                this.props.add(transaction)
              }

              this.props.navigation.navigate("Dashboard")
            }}
          />

        <Button title="Back" onPress={()=>this.props.navigation.navigate("Transactions")}/>

        {this.props.navigation.state.params &&
         this.props.navigation.state.params.transaction &&
          <Button title="Delete" onPress={()=>{}}/>
        }
      </ScrollView>
    </Screen>
    );
  }
}

export default withNavigation(TransactionForm);
