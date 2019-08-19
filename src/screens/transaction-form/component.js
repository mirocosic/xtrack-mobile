import React, { Component } from "react";
import { Text, View, ScrollView, TextInput, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Calendar } from "react-native-calendars"
import { withNavigation } from "react-navigation";
import Modal from "react-native-modal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"
import moment from "moment";
import { get } from "lodash"

import { Screen, Header, Label, PrimaryButton, SecondaryButton } from "../../components"

import { Copy, Title } from "../../components/typography"
import SelectBox from "../../components/select-box"
import Icon from "../../components/icon"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

class TransactionForm extends Component {

  state = {
    blinker: new Animated.Value(0),
    calendarOpen: false,
    modalVisible: false,
    catModalVisible: false,
    transaction: this.props.selectedTransaction,
    accountType: "to",
  }

  componentDidMount() {
    console.log(this.state.selectedTransaction)
    if (!this.state.transaction.amount) {
      this.props.clearSelectedCategory()
      this.props.clearTransactionForm()
    }
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
    const { transfer, edit, add, navigation } = this.props
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
      transfer(payload)
      navigation.navigate("Transactions")
      return;
    }

    if (transaction.id) {
      edit({ ...payload, ...{ id: transaction.id }})
    } else {
      add(payload)
    }

    navigation.navigate("Transactions")
  }

  renderAccounts = (type, callback) => {
    const { accounts, changeAccountFilter, setFrom, setTo } = this.props
    return accounts.map((account, idx) => (
      <TouchableOpacity
        key={idx}
        onPress={() => {
          this.state.accountType === "from" ? setFrom(account) : setTo(account);
          callback()
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon type={account.icon} style={{ marginRight: 10, backgroundColor: account.color }} />
          <Text>{account.name}</Text>
        </View>

      </TouchableOpacity>
    ))
  }

  renderCategories = (callback) => {
    const { categories, changeAccountFilter, setFrom, setTo } = this.props
    return categories.map((cat, idx) => (
      <TouchableOpacity
        key={idx}
        onPress={() => {
          this.props.selectCategory(cat)
          callback()
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5, }}>
          <Icon type={cat.icon} textStyle={{color: cat.color || "blue"}} style={{ marginRight: 10, backgroundColor: "white" }} />
          <Text>{cat.name}</Text>
        </View>

      </TouchableOpacity>
    ))
  }

  render() {
    const { transaction, modalVisible, catModalVisible, blinker } = this.state
    const { navigation, changeAccountFilter, darkMode, changeTransactionAmount, setType, setTransferMode } = this.props

    console.log(transaction)
    return (
      <TouchableWithoutFeedback onPress={() => this.blurInput()}>
        <Screen style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Header title="Transaction form" />

          <KeyboardAwareScrollView contentContainerStyle={styles.wrap}>

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity
                onPress={() => {
                  // setTransferMode(type === "transfer")
                  setType("expense")
                }}
                style={[styles.transactionTypeButton, transaction.type === "expense" && { backgroundColor: "red" }]}>
                <View style={styles.typeWrap}>
                  <Copy style={{color: transaction.type === "expense" ? "white" : "black"}}>EXPENSE</Copy>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // setTransferMode(type === "transfer")
                  setType("income")
                }}
                style={[styles.transactionTypeButton,transaction.type === "income" && { backgroundColor: "green" }]}>
                <View style={styles.typeWrap}>
                  <Copy style={{ color: transaction.type === "income" ? "white" : "black" }}>INCOME</Copy>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // setTransferMode(type === "transfer")
                  setType("transfer")
                }}
                style={[styles.transactionTypeButton,transaction.type === "transfer" && { backgroundColor: "blue" }]}>
                <View style={styles.typeWrap}>
                  <Copy style={{color: transaction.type === "transfer" ? "white" : "black"}}>TRANFER</Copy>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.setState({ calendarOpen: true })}>
                <Icon type="calendar-alt" textStyle={{color: "blue"}} style={{ marginLeft: 0, backgroundColor: "white" }} />
              </TouchableOpacity>
              <Copy style={{ margin: 20 }}>
                {moment(transaction.timestamp).format("dddd, MMMM Do YYYY")}
              </Copy>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>

              { transaction.type !== "transfer" && (
                <View>
                  <TouchableOpacity
                    style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                    onPress={() => this.setState({ catModalVisible: true })}>
                    <Icon type={get(transaction, "category.icon")} style={{ marginRight: 10, backgroundColor: get(transaction, "category.color", "blue") }} />
                    <Text style={darkMode ? styles.textInputDark : styles.textInput}>
                      { get(transaction, "category.name", "select") }
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={{ marginTop: 20, marginBottom: 20, flexDirection: "row", alignItems: "flex-end" }}>
              <Copy>You have spent</Copy>
              <TouchableOpacity
                ref={component => this.touchable = component}
                onPress={() => this.focusInput()}>
                <Animated.View style={{
                  opacity: blinker,
                  backgroundColor: "blue",
                  width: 2,
                  height: 50,
                  position: "absolute",
                  top: 0,
                  zIndex: 10000,
                }}>
                </Animated.View>
                <Copy

                  style={{ color: "gray", backgroundColor: "white", borderRadius: 20, zIndex: 100 }}>
                  {formatCurrency(transaction.amount)}

                </Copy>
              </TouchableOpacity>

              <TextInput
                ref={(ref) => { this.input = ref }}
                onSubmitEditing={() => this.submitForm()}
                onChangeText={value => changeTransactionAmount(value)}
                onBlur={() => Keyboard.dismiss()}
                value={transaction.amount.toString()}
                style={{ backgroundColor: "white", width: 0, height: 50 }}
                keyboardAppearance={darkMode ? "dark" : "light"}
                keyboardType="numeric"
                returnKeyType="done"
              />

            </View>

            { transaction.type === "transfer" && (
              <View>
                <Copy>From Account:</Copy>
                <TouchableOpacity
                  style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                  onPress={() => this.setState({ modalVisible: true, accountType: "from" })}>

                  <Icon icon="money" style={{ marginRight: 10 }} />
                  <Text style={darkMode ? styles.textInputDark : styles.textInput}>
                    {get(transaction, "fromAccount.name")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <Copy>{transaction.type === "transfer" && "To "}Account</Copy>
            <TouchableOpacity
              style={[styles.selectBox, darkMode && styles.selectBoxDark]}
              onPress={() => this.setState({ modalVisible: true, accountType: "to" })}
            >
              <Icon type={transaction.account.icon} style={{ marginRight: 10, backgroundColor: transaction.account.color }} />
              <Text style={darkMode ? styles.textInputDark : styles.textInput}>
                { get(transaction, "account.name")}
              </Text>
            </TouchableOpacity>

            <Copy>Note about this:</Copy>
            <TextInput
              onChangeText={value => this.setState({ transaction: { ...transaction, note: value } })}
              value={transaction.note}
              placeholder="enter notes..."
              style={[styles.textInput, darkMode && styles.textInputDark, { padding: 10, width: "100%" }]}
              multiline={true}
              keyboardAppearance={darkMode ? "dark" : "light"}
            />

            <Copy>Labels</Copy>
            <View style={styles.labels}>

              {transaction.labels.map(label => (
                <Label key={label.uuid} label={label} removeLabel={() => this.props.removeLabel(label)} />
              ))}
              <TouchableOpacity
                onPress={() => navigation.navigate("Labels")}>
                <Title>+</Title>
              </TouchableOpacity>
            </View>



          </KeyboardAwareScrollView>

          <View style={{ flexDirection: "row", justifyContent: "space-evenly", borderTopWidth: 1, paddingTop: 10, paddingBottom: 10 }}>
            <SecondaryButton label="Back" onPress={() => navigation.navigate("Transactions")} />
            {transaction.id && (
              <PrimaryButton
                label="Delete"
                onPress={() => {
                  navigation.navigate("Transactions")
                  this.props.delete({ id: transaction.id })
                }} />
            )}
            <PrimaryButton label="Save" onPress={() => this.submitForm()} />
          </View>

          <View style={[styles.calendarWrap, this.state.calendarOpen ? { display: "flex" } : { display: "none" }]}>
            <Calendar onDayPress={(day) => {
              this.setState({
                transaction: { ...transaction, ...{ timestamp: day.timestamp } },
                calendarOpen: false,
              })
            }} />
          </View>


          <Modal
            style={{ margin: 0, justifyContent: "flex-end" }}
            swipeDirection={["down"]}
            onSwipeComplete={() => this.setState({ modalVisible: false })}
            onBackdropPress={() => this.setState({ modalVisible: false })}
            isVisible={modalVisible}>
            <View style={{ height: 200, width: "100%", padding: 20, backgroundColor: "white" }}>
              <Text style={{ textAlign: "center" }}>Select account</Text>

              <View style={{ padding: 10 }}>
                {this.renderAccounts(transaction.type, () => this.setState({ modalVisible: false }))}
              </View>

              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => this.setState({ modalVisible: false })}>
                <Title>x</Title>
              </TouchableOpacity>

            </View>
          </Modal>

          <Modal
            style={{ margin: 0, justifyContent: "flex-end" }}
            swipeDirection={["down"]}
            onSwipeComplete={() => this.setState({ catModalVisible: false })}
            onBackdropPress={() => this.setState({ catModalVisible: false })}
            isVisible={catModalVisible}>
            <View
              style={{ height: 500, width: "100%", padding: 20, backgroundColor: "white" }}>
              <Text style={{ textAlign: "center" }}>Select category</Text>

              <View style={{ padding: 10 }}>
                {this.renderCategories(() => this.setState({ catModalVisible: false }))}
              </View>

              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => this.setState({ catModalVisible: false })}>
                <Title>x</Title>
              </TouchableOpacity>

            </View>
          </Modal>


        </Screen>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(TransactionForm);
