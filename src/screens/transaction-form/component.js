import React, { Component } from "react";
import { Text, View, TextInput, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Calendar } from "react-native-calendars"
import { withNavigation } from "react-navigation";
import Modal from "react-native-modal"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"
import moment from "moment";
import { get } from "lodash"

import { Screen, Header, Label, PrimaryButton } from "../../components"
import { Copy, Title } from "../../components/typography"
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
    const { navigation, accounts, categories,  clearSelectedCategory, clearTransactionForm } = this.props
    if (navigation.state.params && navigation.state.params.clearForm) {
      const defaultAccount = accounts.find(acc => acc.defaultAccount)
      const defaultCategory = categories.find(cat => cat.defaultCategory)
      clearSelectedCategory()
      clearTransactionForm(defaultAccount, defaultCategory)
    }

    this.input.focus()
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
    console.log("clocked")
    Keyboard.dismiss()
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
      edit({ ...payload, ...{ id: transaction.id } })
    } else {
      add(payload)
    }

    navigation.goBack()
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type={get(account, "icon", "")} style={{ marginRight: 10 }} textStyle={{ color: get(account, "color", "blue") }} />
          <Text>{account.name}</Text>
        </View>

      </TouchableOpacity>
    ))
  }

  renderCategories = (callback) => {
    const { categories, selectCategory } = this.props
    return categories.map(cat => (
      <TouchableOpacity
        key={cat.id}
        onPress={() => {
          selectCategory(cat)
          callback()
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Icon type={get(cat, "icon", "")} textStyle={{ color: cat.color || "blue" }} style={{ marginRight: 10, backgroundColor: "white" }} />
          <Text>{cat.name}</Text>
        </View>

      </TouchableOpacity>
    ))
  }

  renderCategory = (id) => {
    const category = this.props.categories.find(cat => id === cat.id)

    return (
      <View style={{ flexDirection: "row", alignItems: "center", width: 170 }}>
        <Icon
          type={get(category, "icon", "")}
          textStyle={{ color: get(category, "color", "blue") }}
          style={{ backgroundColor: "white" }}
        />
        <Text>{category && category.name}</Text>
      </View>
    )
  }

  renderAccount = (id) => {
    const account = this.props.accounts.find(acc => id === acc.id)

    return (
      <View style={{ flexDirection: "row", alignItems: "center", width: 170 }}>
        <Icon
          type={get(account, "icon", "")}
          textStyle={{ color: get(account, "color", "blue") }}
          style={{ backgroundColor: "white" }}
        />
        <Text>{account && account.name}</Text>
      </View>
    )
  }

  render() {
    const { transaction, modalVisible, catModalVisible, blinker } = this.state
    const { navigation, changeAccountFilter, remove, darkMode, changeTransactionAmount, setType, setTransferMode } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => this.blurInput()}>
        <Screen style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Header
            title="Transaction form"
            backBtn
            actionBtn={transaction.id && <Icon type="trash-alt" />}
            actionBtnPress={() => { remove({ id: transaction.id }); navigation.goBack() }}
          />

          <KeyboardAwareScrollView contentContainerStyle={styles.wrap}>

            <View style={styles.formFieldWrap}>
              <TouchableOpacity
                onPress={() => {
                  // setTransferMode(type === "transfer")
                  setType("expense")
                }}
                style={[styles.transactionTypeButton, transaction.type === "expense" && { backgroundColor: "red" }]}>
                <View style={styles.typeWrap}>
                  <Copy style={{ color: transaction.type === "expense" ? "white" : "black"}}>EXPENSE</Copy>
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
                  <Copy style={{color: transaction.type === "transfer" ? "white" : "black" }}>TRANSFER</Copy>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.formFieldWrap}>
              <Copy>Amount</Copy>
              <View>

                <TouchableOpacity
                  ref={component => this.touchable = component}
                  onPress={() => this.focusInput()}>
                  <Animated.View style={{
                    opacity: blinker,
                    backgroundColor: "blue",
                    width: 2,
                    //height: 50,
                    position: "absolute",
                    top: 0,
                    zIndex: 10000,
                  }}>
                  </Animated.View>

                  <Copy
                    style={{ color: "gray", borderRadius: 20, zIndex: 100, fontSize: 20 }}>
                    {formatCurrency(transaction.amount)}

                  </Copy>
                </TouchableOpacity>

                <TextInput
                  ref={(ref) => { this.input = ref }}
                  onSubmitEditing={() => this.submitForm()}
                  onChangeText={value => changeTransactionAmount(value)}
                  onBlur={() => Keyboard.dismiss()}
                  value={transaction.amount.toString()}
                  style={{ backgroundColor: "white", width: 0, height: 0, fontSize: 20 }}
                  keyboardAppearance={darkMode ? "dark" : "light"}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            </View>

            <View style={styles.formFieldWrap}>
              <Copy>Date</Copy>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => this.setState({ calendarOpen: true })}>
                <Icon type="calendar-alt" textStyle={{ color: "teal" }} style={{ marginLeft: 0 }} />
                <Copy style={{ margin: 10 }}>
                  {moment(transaction.timestamp).format("MMMM Do YYYY")}
                </Copy>
              </TouchableOpacity>
            </View>

            <View style={styles.formFieldWrap}>
              <Copy>Category</Copy>
              <TouchableOpacity
                style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                onPress={() => this.setState({ catModalVisible: true })}>

                {this.renderCategory(get(transaction, "category.id"))}
              </TouchableOpacity>
            </View>

            { transaction.type === "transfer" && (
              <View style={styles.formFieldWrap}>
                <Copy>From Account:</Copy>
                <TouchableOpacity
                  style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                  onPress={() => this.setState({ modalVisible: true, accountType: "from" })}>

                  { this.renderAccount(transaction.fromAccount.id)}
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.formFieldWrap}>
              <Copy>{transaction.type === "transfer" && "To "}Account</Copy>
              <TouchableOpacity
                style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                onPress={() => this.setState({ modalVisible: true, accountType: "to" })}
              >
                { this.renderAccount(transaction.account.id) }
              </TouchableOpacity>

            </View>

            <View style={[styles.formFieldWrap, { alignItems: "flex-start" }]}>
              <Copy>Note</Copy>
              <TextInput
                onChangeText={value => this.setState({ transaction: { ...transaction, note: value } })}
                value={transaction.note}
                placeholder="enter notes..."
                style={[styles.textInput, darkMode && styles.textInputDark, { padding: 10, height: 100, width: "100%" }]}
                multiline={true}
                keyboardAppearance={darkMode ? "dark" : "light"}
              />
            </View>

            <View style={styles.formFieldWrap}>
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
            </View>

          </KeyboardAwareScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.submitForm()}>
              <Copy style={{ color: "teal" }}>Save Transaction</Copy>
            </TouchableOpacity>
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
                <TouchableOpacity
                  style={[styles.inline, { justifyContent: "flex-start", paddingLeft: 5 }]}
                  onPress={() => navigation.navigate("CategoryEdit", {})}>
                  <Icon type="plus" textStyle={{ color: "teal" }} />
                  <Copy style={{ fontSize: 14 }}>Add new category</Copy>
                </TouchableOpacity>

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
