import React, { Component } from "react";
import { Text, View, TextInput, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars"
import { withNavigation } from "react-navigation";
import Modalize from "react-native-modalize"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"
import moment from "moment";
import { get } from "lodash"

import { Screen, Header, Label } from "../../components"
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

  catModal = React.createRef()

  accountsModal = React.createRef()

  labelsModal = React.createRef()

  calendarModal = React.createRef()



  componentDidMount() {
    const { navigation, accounts, categories,  clearSelectedCategory, clearTransactionForm } = this.props
    if (navigation.state.params && navigation.state.params.clearForm) {
      const defaultAccount = accounts.find(acc => acc.defaultAccount)
      const defaultCategory = categories.find(cat => cat.defaultCategory)
      clearSelectedCategory()
      clearTransactionForm(defaultAccount, defaultCategory)
    }

    //this.input.focus()
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

  renderAccounts = (type) => {
    const { accounts, changeAccountFilter, setFrom, setTo } = this.props
    return accounts.map((account, idx) => (
      <TouchableOpacity
        key={idx}
        onPress={() => {
          this.state.accountType === "from" ? setFrom(account) : setTo(account);
          this.accountsModal.current.close()
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type={get(account, "icon", "")} style={{ marginRight: 10 }} textStyle={{ color: get(account, "color", "blue") }} />
          <Text>{account.name}</Text>
        </View>

      </TouchableOpacity>
    ))
  }

  renderCategories = () => {
    const { categories, selectCategory } = this.props
    return categories.map(cat => (
      <TouchableOpacity
        key={cat.id}
        onPress={() => {
          selectCategory(cat)
          this.catModal.current.close()
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Icon type={get(cat, "icon", "")} textStyle={{ color: cat.color || "blue" }} style={{ marginRight: 10, backgroundColor: "white" }} />
          <Text>{cat.name}</Text>
        </View>

      </TouchableOpacity>
    ))
  }

  renderLabels = () => {
    const { labels, attachLabel } = this.props
    return labels.map(label => (
      <TouchableOpacity
        key={label.id}
        onPress={() => {
          attachLabel(label)
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <View style={{ width: 25, height: 25, borderRadius: 10, backgroundColor: label.color, marginRight: 10 }} />
          <Text>{label.name}</Text>
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

    const { width } = Dimensions.get("window")

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
                onPress={() => this.calendarModal.current.open()}>
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
                onPress={() => this.catModal.current.open()}>
                {this.renderCategory(get(transaction, "category.id"))}
              </TouchableOpacity>
            </View>

            { transaction.type === "transfer" && (
              <View style={styles.formFieldWrap}>
                <Copy>From Account:</Copy>
                <TouchableOpacity
                  style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                  onPress={() => {
                    this.accountsModal.current.open()
                    this.setState({ accountType: "from" })
                  }}>
                  { this.renderAccount(transaction.fromAccount.id)}
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.formFieldWrap}>
              <Copy>{transaction.type === "transfer" && "To "}Account</Copy>
              <TouchableOpacity
                style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                onPress={() => {
                  this.accountsModal.current.open()
                  this.setState({ accountType: "to" })
                }}
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
                  onPress={() => this.labelsModal.current.open()}>
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


          <Modalize
            adjustToContentHeight={true}
            ref={this.accountsModal}>
            <View style={{ height: 200, width: "100%", padding: 20, backgroundColor: "white", borderRadius: 10  }}>
              <Text style={{ textAlign: "center" }}>Select account</Text>

              <View style={{ padding: 10 }}>
                {this.renderAccounts(transaction.type)}
              </View>

              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => this.accountsModal.current.close()}>
                <Title>x</Title>
              </TouchableOpacity>

            </View>
          </Modalize>

          <Modalize
            adjustToContentHeight={true}
            ref={this.catModal}>
            <View style={{ height: 500, width: "100%", padding: 20, backgroundColor: "white", borderRadius: 10 }}>

              <View style={{ padding: 10 }}>
                {this.renderCategories()}
                <TouchableOpacity
                  style={[styles.inline, { justifyContent: "flex-start", paddingLeft: 5 }]}
                  onPress={() => navigation.navigate("CategoryEdit", {})}>
                  <Icon type="plus" textStyle={{ color: "teal" }} />
                  <Copy style={{ fontSize: 14 }}>Add new category</Copy>
                </TouchableOpacity>

              </View>

              <TouchableOpacity
                style={{ position: "absolute", top: 10, right: 10, borderRadius: 10  }}
                onPress={() => this.catModal.current.close()}>
                <Title>x</Title>
              </TouchableOpacity>

            </View>
          </Modalize>

          <Modalize
            adjustToContentHeight={true}
            ref={this.labelsModal}>
            <View style={{ width: "100%", padding: 20, backgroundColor: "white", borderRadius: 10 }}>

              <View style={{ padding: 10 }}>
                {this.renderLabels()}
                <TouchableOpacity
                  style={[styles.inline, { justifyContent: "flex-start", paddingLeft: 5 }]}
                  onPress={() => navigation.navigate("LabelEdit", {})}>
                  <Icon type="plus" textStyle={{ color: "teal" }} />
                  <Copy style={{ fontSize: 14 }}>Add new label</Copy>
                </TouchableOpacity>

              </View>

            </View>
          </Modalize>

          <Modalize
            modalHeight={400}
            scrollViewProps={{ scrollEnabled: false }}
            HeaderComponent={<View style={{backgroundColor: "white", height: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10}}></View>}
            ref={this.calendarModal}>
            <View style={{ height: 500, width: "100%", padding: 10, backgroundColor: "white", borderRadius: 10 }}>

              <Calendar
                theme={{
                  todayTextColor: "teal",
                }}
                onDayPress={(day) => {
                  this.setState({ transaction: { ...transaction, ...{ timestamp: day.timestamp } } })
                  this.calendarModal.current.close()
                }}
              />

            </View>
          </Modalize>


        </Screen>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(TransactionForm);
