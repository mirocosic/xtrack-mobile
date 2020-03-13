import React, { Component } from "react"
import {
  Text, View, TextInput, Animated, TouchableOpacity, TouchableWithoutFeedback,
  Keyboard, Switch, Platform, ActionSheetIOS, Alert, ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars"
import Modalize from "react-native-modalize"
import Collapsible from "react-native-collapsible"
import moment from "moment"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"

import { Screen, Header, Label, CustomKeyboard, TransactionType, PrimaryButton } from "../../components"
import { Copy, CopyBlue, Title } from "../../components/typography"
import Icon from "../../components/icon"
import { formatCurrency } from "../../utils/currency"
import palette from "../../utils/palette"
import styles from "./styles"

class TransactionForm extends Component {

  static contextType = DarkModeContext

  state = {
    moreOptionsOpen: false,
    blinker: new Animated.Value(0),
    transaction: this.props.selectedTransaction,
    accountType: "to",
  }

  catModal = React.createRef()

  accountsModal = React.createRef()

  labelsModal = React.createRef()

  calendarModal = React.createRef()

  recurringCalendarModal = React.createRef()

  componentDidMount() {
    const { route, accounts, categories, clearSelectedCategory, clearTransactionForm } = this.props
    if (route.params && route.params.clearForm) {
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
    const { blinker } = this.state
    this.input.focus()

    Animated.loop(
      Animated.sequence([
        Animated.timing(blinker, {
          toValue: 1,
          duration: 0,
        }),
        Animated.timing(blinker, {
          toValue: 0,
          duration: 500,
        }),
        Animated.timing(blinker, {
          toValue: 1,
          duration: 500,
        }),
      ]),

    ).start()
  }

  blurInput = () => {
    const { blinker } = this.state
    Keyboard.dismiss()
    this.input.blur()
    blinker.stopAnimation()
  }

  submitForm = () => {
    const { transfer, add, navigation, addRecurring } = this.props
    const { transaction } = this.state

    if (transaction.type === "transfer") {
      transfer(transaction)
      navigation.goBack()
      return;
    }

    if (transaction.id) {
      this.editTransaction(transaction)
    } else {
      add(transaction)
      navigation.goBack()
    }

    if (!transaction.id && transaction.recurring) {
      addRecurring(transaction.recurring)
      navigation.goBack()
    }
  }

  editTransaction = (transaction) => {
    const { navigation, edit, editAllRecurring, editFutureRecurring } = this.props
    if (!transaction.recurring) {
      edit(transaction)
      navigation.goBack()
    } else if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Edit All", "Edit Future Transactions", "Edit Only This", "Cancel"],
          cancelButtonIndex: 3,
          title: "Warning!",
          message: "This is a recurring transaction. Please choose to edit all transactions, all future transactions, or only this one.",
        }, (btnIdx) => {
          switch (btnIdx) {
            case 0:
              editAllRecurring(transaction)
              navigation.goBack()
              break;
            case 1:
              editFutureRecurring(transaction)
              navigation.goBack()
              break;
            case 2:
              edit(transaction)
              navigation.goBack()
              break;
            default:
              break;
          }
        },
      )
    } else {
      Alert.alert("Warning!", "This is recurring transaction. Need to add Android specific code for edit.")
    }
  }

  deleteTransaction = (transaction) => {
    const { navigation, remove, removeFutureRecurring, removeAllRecurring } = this.props

    if (transaction.recurring) {
      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Delete All", "Delete Future Transactions", "Delete Only This", "Cancel"],
            cancelButtonIndex: 3,
            title: "Warning!",
            message: "This is a recurring transaction. Please choose to delete all transactions, all future transactions, or only this one.",
          }, (btnIdx) => {
            switch (btnIdx) {
              case 0:
                removeAllRecurring(transaction)
                navigation.goBack()
                break
              case 1:
                removeFutureRecurring(transaction)
                navigation.goBack()
                break
              case 2:
                remove(transaction)
                navigation.goBack()
                break
              default:
                break
            }
          },
        )
      } else {
        Alert.alert("Warning!", "This is recurring transaction. Need to add Android specific code for deletion.")
      }
    } else {
      remove({ id: transaction.id })
      navigation.goBack()
    }
  }

  renderAccounts = () => {
    const { accounts } = this.props
    const { transaction, accountType } = this.state
    return accounts.map(account => (
      <TouchableOpacity
        key={account.id}
        onPress={() => {
          accountType === "from"
            ? this.setState({ transaction: { ...transaction, fromAccountId: account.id, currency: account.currency } })
            : this.setState({ transaction: { ...transaction, accountId: account.id, currency: account.currency } })
          this.accountsModal.current.close()
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type={get(account, "icon", "")} style={{ marginRight: 10 }} textStyle={{ color: get(account, "color", "blue") }} />
          <Copy>{account.name}</Copy>
        </View>

      </TouchableOpacity>
    ))
  }

  renderCategories = () => {
    const { transactions, categories } = this.props
    const { transaction } = this.state
    const categoriesWithCount = categories.map(cat => ({
      ...cat,
      count: transactions.filter(t => get(t, "categoryId") === cat.id).length,
    }))

    return categoriesWithCount
      .sort((a, b) => b.count - a.count)
      .map(cat => (
        <TouchableOpacity
          key={cat.id}
          onPress={() => {
            this.setState({ transaction: { ...transaction, categoryId: cat.id } })
            this.catModal.current.close()
          }}>
          <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
            <Icon type={get(cat, "icon", "")} textStyle={{ color: cat.color || "blue" }} style={{ marginRight: 10 }} />
            <Copy>{cat.name}</Copy>
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
    const { categories } = this.props
    const category = categories.find(cat => id === cat.id)

    return (
      <View style={{ flexDirection: "row", alignItems: "center", width: 170 }}>
        <Icon
          type={get(category, "icon", "")}
          textStyle={{ color: get(category, "color", "blue") }}
        />
        <Copy>{category && category.name}</Copy>
      </View>
    )
  }

  renderAccount = (id) => {
    const { accounts } = this.props
    const account = accounts.find(acc => id === acc.id)

    return (
      <View style={{ flexDirection: "row", alignItems: "center", width: 170 }}>
        <Icon
          type={get(account, "icon", "")}
          textStyle={{ color: get(account, "color", "blue") }}
        />
        <Copy>{account && account.name}</Copy>
      </View>
    )
  }

  selectRecurringSchedule = () => {
    const { transaction } = this.state
    ActionSheetIOS.showActionSheetWithOptions({
      options: ["Day", "Week", "Month", "Year", "Cancel"],
      cancelButtonIndex: 4,
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          this.setState({ transaction: { ...transaction, recurring: { ...transaction.recurring, frequency: "Day" } } })
          break;
        case 1:
          this.setState({ transaction: { ...transaction, recurring: { ...transaction.recurring, frequency: "Week" } } })
          break;
        case 2:
          this.setState({ transaction: { ...transaction, recurring: { ...transaction.recurring, frequency: "Month" } } })
          break;
        case 3:
          this.setState({ transaction: { ...transaction, recurring: { ...transaction.recurring, frequency: "Year" } } })
          break;
        default:
          break;
      }
    })
  }

  render() {
    const { transaction, blinker, moreOptionsOpen } = this.state
    const { navigation, removeLabel, changeTransactionAmount } = this.props
    const darkMode = this.context === "dark"

    return (
      <TouchableWithoutFeedback onPress={() => this.blurInput()}>
        <Screen style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Header
            title="Transaction form"
            backBtn
            actionBtn={transaction.id && <Icon type="trash-alt" />}
            actionBtnPress={() => this.deleteTransaction(transaction)}
          />

          <View style={styles.wrap}>

            <TransactionType setType={type => this.setState({ transaction: { ...transaction, type } })} transaction={transaction} />

            <View style={styles.formFieldWrap}>
              <Copy>Amount</Copy>
              <View>

                <TouchableOpacity
                  ref={component => this.touchable = component}
                  onPress={() => { this.setState({ moreOptionsOpen: false }) }
                  }>
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
                    style={{ color: "teal", borderRadius: 20, zIndex: 100, fontSize: 30 }}>
                    {transaction.type === "expense" && "-" }
                    {transaction.type === "income" && "+" }
                    {formatCurrency(transaction.amount, transaction.currency)}

                  </Copy>
                </TouchableOpacity>

                <TextInput
                  ref={(ref) => { this.input = ref }}
                  onSubmitEditing={() => this.submitForm()}
                  onChangeText={value => changeTransactionAmount(value)}
                  onBlur={() => Keyboard.dismiss()}
                  value={transaction.amount.toString()}
                  style={{ backgroundColor: darkMode ? palette.darkGray : "white", width: 0, height: 0, fontSize: 50 }}
                  keyboardAppearance={darkMode ? "dark" : "light"}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            </View>

            <View style={styles.formFieldWrap}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => this.calendarModal.current.open()}>
                <Icon
                  type="calendar-alt"
                  style={{ paddingLeft: 0, width: 20 }}
                  textStyle={{ color: "teal", marginLeft: 0, paddingLeft: 0, width: 20 }}
                />
                <Copy>{moment(transaction.timestamp).format("MMM Do YYYY")}</Copy>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                onPress={() => this.catModal.current.open()}>
                {this.renderCategory(get(transaction, "categoryId"))}
              </TouchableOpacity>

            </View>

            <View style={styles.formFieldWrap} />

            { transaction.type === "transfer" && (
              <View style={styles.formFieldWrap}>
                <Copy>From Account:</Copy>
                <TouchableOpacity
                  style={[styles.selectBox, darkMode && styles.selectBoxDark]}
                  onPress={() => {
                    this.accountsModal.current.open()
                    this.setState({ accountType: "from" })
                  }}>
                  { this.renderAccount(transaction.fromAccountId)}
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
                { this.renderAccount(transaction.accountId) }
              </TouchableOpacity>

            </View>

            <View style={[styles.formFieldWrap, { alignItems: "center", paddingBottom: 10 }]}>
              <TextInput
                onChangeText={value => this.setState({ transaction: { ...transaction, note: value } })}
                value={transaction.note}
                placeholder="enter note..."
                style={[styles.textInput, darkMode && styles.textInputDark, { marginLeft: 0, padding: 10, height: 40, width: "100%" }]}
                keyboardAppearance={darkMode ? "dark" : "light"}
              />
            </View>

            { !moreOptionsOpen
              ? (
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => this.setState({ moreOptionsOpen: true })}
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <CopyBlue>More Options</CopyBlue>
                </TouchableOpacity>
              )
              : (
                <View>
                  <View style={[styles.formFieldWrap, { alignItems: "center" }]}>
                    <Copy>Recurring</Copy>
                    <Switch
                      value={!!transaction.recurring}
                      onValueChange={() => this.setState({ transaction: { ...transaction, recurring: !transaction.recurring } })}
                    />
                  </View>

                  <Collapsible collapsed={transaction.recurring === false} style={{ padding: 20, paddingTop: 10 }}>
                    <View style={styles.inlineBetween}>
                      <Copy>Every</Copy>
                      <TouchableOpacity onPress={() => this.selectRecurringSchedule()}>
                        <Copy>{ (transaction.recurring && transaction.recurring.frequency) || "Month"}</Copy>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inlineBetween}>
                      <Copy>End Date</Copy>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => this.recurringCalendarModal.current.open()}>
                        <Icon type="calendar-alt" textStyle={{ color: "teal" }} style={{ marginLeft: 0 }} />
                        <Copy style={{ margin: 0 }}>
                          { transaction.recurring && moment(transaction.recurring.endTimestamp).format("MMM Do YYYY")}
                        </Copy>
                      </TouchableOpacity>
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

                  <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={{ alignItems: "center", margin: 20 }}
                    onPress={() => this.setState({ moreOptionsOpen: false })}
                  >
                    <CopyBlue>Less Options</CopyBlue>
                  </TouchableOpacity>

                  <PrimaryButton label="Save" onPress={() => this.submitForm()} />
                </View>
              )

            }

          </View>

          {
            !moreOptionsOpen

              && (
                <CustomKeyboard
                  handlePress={value => this.setState({ transaction: { ...transaction, ...{ amount: transaction.amount + value } } })}
                  handleSubmit={() => this.submitForm()}
                  setAmount={value => this.setState({ transaction: { ...transaction, ...{ amount: value } } })}
                  delete={() => this.setState({
                    transaction: {
                      ...transaction,
                      ...{ amount: transaction.amount.substring(0, transaction.amount.length - 1) },
                    },
                  })}
                />
              )
          }


          <Modalize
            adjustToContentHeight
            ref={this.accountsModal}>
            <View style={[{ minHeight: 300 }, styles.modalContainer, darkMode && styles.modalContainerDark]}>

              <View style={{ padding: 10 }}>
                {this.renderAccounts(transaction.type)}
              </View>

              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => this.accountsModal.current.close()}>
                <Icon type="times" textStyle={{ color: "teal" }} />
              </TouchableOpacity>

            </View>
          </Modalize>

          <Modalize
            adjustToContentHeight
            ref={this.catModal}>
            <ScrollView
              style={[{ minHeight: 300, paddingBottom: 20, borderRadius: 10 }, styles.modal, darkMode && styles.modalDark]}
              contentContainerStyle={[styles.modalContainer, darkMode && styles.modalContainerDark]}>

              <View style={{ padding: 10 }}>
                {this.renderCategories()}
                <TouchableOpacity
                  style={[styles.inline, { justifyContent: "flex-start", paddingLeft: 5 }]}
                  onPress={() => navigation.navigate("CategoryEdit", {})}>
                  <Icon type="plus" textStyle={{ color: "teal" }} />
                  <Copy style={{ fontSize: 14 }}>Add new category</Copy>
                </TouchableOpacity>

              </View>

            </ScrollView>
          </Modalize>

          <Modalize
            adjustToContentHeight
            ref={this.labelsModal}>
            <View style={[{ minHeight: 300 }, styles.modalContainer, darkMode && styles.modalContainerDark]}>

              <View style={{ padding: 10 }}>
                {this.renderLabels()}
                <TouchableOpacity
                  style={[styles.inline, { justifyContent: "flex-start", paddingLeft: 5 }]}
                  onPress={() => navigation.navigate("LabelEdit", {})}>
                  <Icon type="plus" textStyle={{ color: "teal" }} />
                  <Copy style={{ fontSize: 14 }}>Add new tag</Copy>
                </TouchableOpacity>

              </View>

            </View>
          </Modalize>

          <Modalize
            modalHeight={400}
            style={{ backgroundColor: darkMode ? palette.darkGray : "white" }}
            scrollViewProps={{ scrollEnabled: false }}
            contentContainerStyle={[styles.modalContainer, darkMode && styles.modalContainerDark]}
            ref={this.calendarModal}
          >
            <View style={[{ minHeight: 400 }, styles.modalContainer, darkMode && styles.modalContainerDark]}>

              <Calendar
                theme={{
                  monthTextColor: darkMode ? palette.blue : palette.darkGray,
                  dayTextColor: darkMode ? "white" : "black",
                  todayTextColor: "teal",
                  calendarBackground: darkMode ? palette.darkGray : "white",
                }}
                onDayPress={(day) => {
                  this.setState({ transaction: { ...transaction, ...{ timestamp: day.timestamp } } })
                  this.calendarModal.current.close()
                }}
              />

            </View>
          </Modalize>

          <Modalize
            modalHeight={400}
            scrollViewProps={{ scrollEnabled: false }}
            HeaderComponent={<View style={{ backgroundColor: "white", height: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />}
            ref={this.recurringCalendarModal}>
            <View style={{ height: 500, width: "100%", padding: 10, backgroundColor: "white", borderRadius: 10 }}>

              <Calendar
                theme={{ todayTextColor: "teal" }}
                onDayPress={(day) => {
                  this.setState({ transaction: { ...transaction, recurring: { ...transaction.recurring, endTimestamp: day.timestamp } } })
                  this.recurringCalendarModal.current.close()
                }}
              />

            </View>
          </Modalize>

        </Screen>
      </TouchableWithoutFeedback>
    );
  }
}

export default TransactionForm
