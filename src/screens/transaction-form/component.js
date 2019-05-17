import React, { Component } from "react";
import {
  Text, View, ScrollView, TextInput, Button, Animated,
  TouchableOpacity, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import { Calendar } from "react-native-calendars"
import { withNavigation } from "react-navigation";
import moment from "moment";
import { get } from "lodash"

import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"
import SelectBox from "../../components/select-box"
import Icon from "../../components/icon"
import Label from "../../components/label"
import { PrimaryButton, SecondaryButton } from "../../components/buttons"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

class TransactionForm extends Component {

  state = {
    blinker: new Animated.Value(0),
    calendarOpen: false,
    transaction: this.props.selectedTransaction
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ transaction: nextProps.selectedTransaction });
  }

  focusInput = () => {
    this.input.focus()

    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.blinker, {
          toValue: 1,
          duration: 0,
        }),
        Animated.timing(this.state.blinker, {
          toValue: 0,
          duration: 500,
        }),
        Animated.timing(this.state.blinker, {
          toValue: 1,
          duration: 500,
        }),
      ]),

    ).start()
  }

  blurInput = () => {
    this.input.blur()
    // this.setState({stopAnimation: true});
    this.state.blinker.stopAnimation()
  }


  submitForm = () => {
    const { transaction } = this.state
    const payload = {
      timestamp: transaction.timestamp,
      account: transaction.account,
      fromAccount: transaction.fromAccount,
      type: transaction.type,
      amount: transaction.type === "expense" ? -transaction.amount : transaction.amount,
      note: transaction.note,
      category: transaction.category,
      labels: transaction.labels,
    }

    if (transaction.type === "transfer") {
      this.props.transfer(payload)
      this.props.navigation.navigate("Dashboard")
      return;
    }

    if (transaction.id) {
      this.props.edit({ ...payload, ...{ id: transaction.id }})
    } else {
      this.props.add(payload)
    }

    this.props.navigation.navigate("Dashboard")
  }

  render() {
    const { transaction } = this.state

    return (
      <TouchableWithoutFeedback onPress={() => this.blurInput()}>
        <Screen style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Title style={styles.welcome}>Enter your expense now!</Title>


          <ScrollView contentContainerStyle={styles.wrap}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", zIndex: 10000 }}>
              <Title>This is your </Title>
              <Title>on</Title>
              <SelectBox
                selected={transaction.type}
                onPress={(type) => {
                  this.props.setTransferMode(type === "transfer")
                  this.props.setType(type)
                }} />
            </View>


            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.setState({ calendarOpen: true })}>
                <Icon style={{ marginLeft: 0 }} />
              </TouchableOpacity>
              <Copy style={{ margin: 20 }}>
                {moment(transaction.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </Copy>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Title>in category</Title>

              { transaction.type !== "transfer" && (
                <View>
                  <TouchableOpacity
                    style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
                    onPress={() => this.props.navigation.navigate("Categories")}>
                    <Icon type={get(transaction, "category.icon")} style={{marginRight: 10, backgroundColor: get(transaction, "category.color", "blue")}} />
                    <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>
                      { get(transaction, "category.name", "select") }
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
            </View>

          <View style={{marginTop: 20, marginBottom: 20, flexDirection: "row", alignItems: "flex-end"}}>
            <Title>You have spent</Title>
            <TouchableOpacity
              ref={component => this.touchable = component}
              onPress={() => this.focusInput()}>
              <Animated.View style={{
                opacity: this.state.blinker,
                backgroundColor: "blue",
                width: 2,
                height: 50,
                position: "absolute",
                top: 0,
                zIndex: 10000
              }}>
              </Animated.View>
              <Title

                style={{ color: "gray", backgroundColor: "white", borderRadius: 20, zIndex: 100 }}>
                {formatCurrency(transaction.amount)}

              </Title>
            </TouchableOpacity>

            <TextInput
              ref={(ref) => { this.input = ref }}
              onSubmitEditing={() => this.submitForm()}
              onChangeText={value => this.setState({
                transaction: {
                  ...transaction,
                  ...{ amount: value },
                },
              })}
              onBlur={() => Keyboard.dismiss()}
              value={transaction.amount}
              style={{ backgroundColor: "white", width: 0, height: 50 }}

              keyboardAppearance={this.props.darkMode ? "dark" : "light"}
              keyboardType="numeric"
              returnKeyType="done"
            />

          </View>

            { transaction.type === "transfer" && (
              <View>
                <Title>From Account:</Title>
                <TouchableOpacity
                  style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
                  onPress={()=>this.props.navigation.navigate("Accounts", {accountField: "from"})}>
                  <Icon icon="money" style={{marginRight: 10}}/>
                  <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>
                    {get(transaction, "fromAccount.name")}
                  </Text>

                </TouchableOpacity>
              </View>
            )}

            <Title>{transaction.type === "transfer" && "To "}Account</Title>
            <TouchableOpacity
              style={[styles.selectBox, this.props.darkMode && styles.selectBoxDark]}
              onPress={()=>this.props.navigation.navigate("Accounts", {accountField: "to"})}>
              <Icon icon="money" style={{marginRight: 10}}/>
              <Text style={this.props.darkMode ? styles.textInputDark : styles.textInput}>

                { get(transaction, "account.name")}
              </Text>
            </TouchableOpacity>

            <Title>Note about this:</Title>
            <TextInput
              onChangeText={(value) => this.setState({note: value})}
              value={transaction.note}
              placeholder="enter notes..."
              style={[styles.textInput, this.props.darkMode && styles.textInputDark, {padding:10, width: "100%"} ]}
              multiline={true}
              returnKeyType="done"
              keyboardAppearance={this.props.darkMode ? "dark" : "light"}
            />

            <Copy>Labels</Copy>

            <View style={styles.labels}>

              {transaction.labels.map(label => (
                <Label key={label.uuid} label={label} removeLabel={() => this.props.removeLabel(label)} />
              ))}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Labels")}>
                <Title>+</Title>
              </TouchableOpacity>
            </View>


            <PrimaryButton label="Done!" onPress={() => this.submitForm()} />

            <SecondaryButton label="Back" onPress={() => this.props.navigation.navigate("Transactions")} />

            {transaction.id && (
              <PrimaryButton
                label="Delete"
                onPress={() => {
                  this.props.navigation.navigate("Transactions")
                  this.props.delete({ id: transaction.id })
                }} />
            )}

          </ScrollView>

          <View style={[styles.calendarWrap, this.state.calendarOpen ? { display: "flex" } : { display: "none" }]}>
            <Calendar onDayPress={(day) => {
              this.setState({
                transaction: { ...transaction, ...{ timestamp: day.timestamp } },
                calendarOpen: false,
              })
            }} />
          </View>
        </Screen>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(TransactionForm);
