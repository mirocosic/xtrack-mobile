import React, { Component } from "react";
import {
  Text, View, TextInput, Animated, TouchableOpacity, TouchableWithoutFeedback,
  Keyboard, Dimensions, Switch, Platform, ActionSheetIOS,
} from "react-native";
import { Calendar } from "react-native-calendars"
import { withNavigation } from "react-navigation"
import Modalize from "react-native-modalize"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"
import Collapsible from "react-native-collapsible"
import moment from "moment"
import { get } from "lodash"

import { Screen, Header, Label, CustomKeyboard } from "../../components"
import { Copy, Title } from "../../components/typography"
import Icon from "../../components/icon"
import { formatCurrency } from "../../utils/currency"
import styles from "./styles"

class TransactionForm extends Component {

  state = {
    blinker: new Animated.Value(0),
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
    Keyboard.dismiss()
    this.input.blur()
    // this.setState({stopAnimation: true});
    this.state.blinker.stopAnimation()
  }

  submitForm = () => {
    const { transfer, edit, add, navigation } = this.props
    const { transaction } = this.state

    if (transaction.type === "transfer") {
      transfer(transaction)
      navigation.goBack()
      return;
    }

    transaction.id ? edit(transaction) : add(transaction)

    if (!transaction.id && transaction.recurring) {
      this.props.addRecurring()
    }

    navigation.goBack()
  }

  deleteTransaction = (transaction) => {
    const { navigation } = this.props

    if (transaction.recurring) {
      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Delete All", "Delete Future Transactions", "Delete Only This", "Cancel"],
            cancelButtonIndex: 3,
            title: "Warning!",
            message: "This is a recurring transaction. Please choose to delete all transactions, all future transactions,  or only this one.",
          }, (btnIdx) => {
            switch (btnIdx) {
              case 0:
                this.props.removeAllRecurring(transaction)
                navigation.goBack()
                break;
              case 1:
                this.props.removeFutureRecurring(transaction)
                navigation.goBack()
                break;
              case 2:
                this.props.remove(transaction)
                navigation.goBack()
                break;
              default:
                break;
            }
          }
        )
      } else {
        Alert.alert("Warning!", "This is recurring transaction. Need to add Android specific code for deletion.")
      }
    } else {
      this.props.remove({ id: transaction.id })
      navigation.goBack()
    }
  }

  renderAccounts = () => {
    const { accounts, changeAccountFilter, setFrom, setTo } = this.props
    return accounts.map(account => (
      <TouchableOpacity
        key={account.id}
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
        }}>
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
        onPress={() => attachLabel(label)}>

        <Label key={label.uuid} label={label} style={{ width: 70 }} />

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
    const { navigation, changeAccountFilter, remove, removeLabel, darkMode, changeTransactionAmount, setType, setTransferMode } = this.props

    const { width } = Dimensions.get("window")

    return (
      <TouchableWithoutFeedback onPress={() => this.blurInput()}>
        <Screen style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Header
            title="Transaction form"
            backBtn
            actionBtn={transaction.id && <Icon type="trash-alt" />}
            actionBtnPress={() => this.deleteTransaction(transaction)}
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
                    position: "absolute",
                    top: 0,
                    zIndex: 10000,
                  }}>
                  </Animated.View>

                  <Copy
                    style={{ color: "gray", borderRadius: 20, zIndex: 100, fontSize: 20 }}>
                    {transaction.type === "expense" && "-" }
                    {transaction.type === "income" && "+" }
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

            <View style={[styles.formFieldWrap, { alignItems: "center" }]}>
              <Copy>Note</Copy>
              <TextInput
                onChangeText={value => this.setState({ transaction: { ...transaction, note: value } })}
                value={transaction.note}
                placeholder="enter note..."
                style={[styles.textInput, darkMode && styles.textInputDark, { marginLeft: 30, padding: 10, height: 40, width: "100%" }]}
                keyboardAppearance={darkMode ? "dark" : "light"}
              />
            </View>

            <View style={[styles.formFieldWrap, { alignItems: "center" }]}>
              <Copy>Recurring</Copy>
              <Switch value={transaction.recurring} onValueChange={() => this.setState({ transaction: { ...transaction, recurring: !transaction.recurring } })} />
            </View>

            <Collapsible collapsed={!this.state.recurring}>
              <View>
                <Text>Options</Text>
              </View>
            </Collapsible>

            <View style={styles.formFieldWrap}>
              <TouchableOpacity
                style={{ backgroundColor: "teal", padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 20 }}
                onPress={() => this.labelsModal.current.open()}>
                <Copy style={{ color: "white", fontSize: 12 }}>Add Tags</Copy>
              </TouchableOpacity>
              <View style={styles.labels}>

                {transaction.labels.map(label => (
                  <Label key={label.uuid} label={label} removeLabel={() => removeLabel(label)} />
                ))}

              </View>
            </View>

          </KeyboardAwareScrollView>

          <CustomKeyboard
            handlePress={value => changeTransactionAmount(transaction.amount + value)}
            handleSubmit={() => this.submitForm()}
            delete={() => changeTransactionAmount(transaction.amount.substring(0, transaction.amount.length - 1))}
            setAmount={changeTransactionAmount}
          />

          <Modalize
            adjustToContentHeight={true}
            ref={this.accountsModal}>
            <View style={{ height: 200, width: "100%", padding: 20, backgroundColor: "white", borderRadius: 10 }}>
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
                style={{ position: "absolute", top: 10, right: 10, borderRadius: 10 }}
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
                theme={{ todayTextColor: "teal" }}
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
