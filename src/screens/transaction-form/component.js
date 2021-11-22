import React, { Component } from "react"
import {
  View, TextInput, TouchableOpacity,
  Keyboard, Switch, Platform, ActionSheetIOS, Alert, ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars"
import { Modalize } from "react-native-modalize"
import { connectActionSheet } from '@expo/react-native-action-sheet';

import moment from "moment"
import { get, truncate } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"

import { Screen, Header, Label, CustomKeyboard, TransactionType, PrimaryButton, TertiaryButton } from "../../components"
import SelectAccountModal from "../../components/modals/select-account"
import SelectCategoryModal from "../../components/modals/select-category"
import SelectLabelsModal from "../../components/modals/select-labels"
import FormMoreOptions from "../../components/form-more-options"
import { Copy, CopyBlue } from "../../components/typography"
import Icon from "../../components/icon"
import { formatCurrency } from "../../utils/currency"
import { makeUUID } from "../../utils/helper-gnomes"
import palette from "../../utils/palette"
import { isAndroid } from "../../utils/os-utils"
import styles from "./styles"

class TransactionForm extends Component {

  static contextType = DarkModeContext

  state = {
    moreOptionsOpen: false,
    transaction: { amount: 0 },
    accountType: "to",
  }

  catModal = React.createRef()
  accountsModal = React.createRef()
  labelsModal = React.createRef()
  calendarModal = React.createRef()
  recurringCalendarModal = React.createRef()

  componentDidMount() {
    const { route, accounts, categories, transactions } = this.props

    if (route.params.transactionId) {
      this.setState({ transaction: transactions.find(t => route.params.transactionId === t.id) })
    } else {
      const defaultAccount = accounts.find(acc => acc.defaultAccount)
      const defaultCategory = categories.find(cat => cat.defaultCategory)
      this.setState({
        transaction:
        {
          amount: 0,
          type: "expense",
          timestamp: Date.now(),
          accountId: defaultAccount?.id,
          categoryId: defaultCategory?.id,
          labels: [],
        },
      })
    }

  }

  submitForm = () => {
    const { transfer, add, navigation, addRecurring } = this.props
    const { transaction } = this.state

    if (!transaction.categoryId || !transaction.accountId) {
      Alert.alert("Warning!", "Make sure you have selected a category and an account.")
      return
    }

    if (transaction.type === "transfer") {
      transfer(transaction)
      navigation.goBack()
      return;
    }

    if (transaction.id) {
      this.editTransaction(transaction)
    } else {
      navigation.goBack()
      setTimeout(() => add(transaction))
    }

    if (!transaction.id && transaction.recurring) {
      setTimeout(() => addRecurring(transaction.recurring))
    }
  }

  editTransaction = (transaction) => {
    const { navigation, edit, editAllRecurring, editFutureRecurring, theme } = this.props
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"

    if (!transaction.recurring) {
      edit(transaction)
      navigation.goBack()
    } else {
      this.props.showActionSheetWithOptions(
        {
          options: ["Edit All", "Edit Future Transactions", "Edit Only This", "Cancel"],
          cancelButtonIndex: 3,
          title: "Warning!",
          message: "This is a recurring transaction. Please choose to edit all transactions, all future transactions, or only this one.",
          userInterfaceStyle: theme,
          containerStyle: { backgroundColor: darkMode ? palette.dark : palette.light},
          textStyle: { color: darkMode ? palette.light : palette.dark},
          titleTextStyle: { color: darkMode ? palette.lightGray : palette.gray},
          messageTextStyle: { color: darkMode ? palette.lightGray : palette.gray}
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
    }
  }

  deleteTransaction = (transaction) => {
    const { navigation, remove, removeFutureRecurring, removeAllRecurring, theme } = this.props
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"

    if (transaction.recurring) {
      this.props.showActionSheetWithOptions(
        {
          options: ["Delete All", "Delete Future Transactions", "Delete Only This", "Cancel"],
          cancelButtonIndex: 3,
          title: "Warning!",
          message: "This is a recurring transaction. Please choose to delete all transactions, all future transactions, or only this one.",
          userInterfaceStyle: theme,
          containerStyle: { backgroundColor: darkMode ? palette.dark : palette.light},
          textStyle: { color: darkMode ? palette.light : palette.dark},
          titleTextStyle: { color: darkMode ? palette.lightGray : palette.gray},
          messageTextStyle: { color: darkMode ? palette.lightGray : palette.gray}
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
      remove({ id: transaction.id })
      navigation.goBack()
    }
  }


  removeLabel = (label) => {
    const { transaction } = this.state
    this.setState({
      transaction: {
        ...transaction,
        ...{ labels: transaction.labels.filter(l => l.uuid !== label.uuid) },
      },
    })
  }

  renderCategory = (id) => {
    const { categories } = this.props
    const category = categories.find(cat => id === cat.id)

    return (
      <View style={{ flexDirection: "row", alignItems: "center", width: 165}}>
        <Icon
          type={get(category, "icon", "")}
          textStyle={{ color: get(category, "color", "blue") }}
        />
        <Copy style={{flexWrap: "wrap", width: 120}}>{category ? truncate(category.name, {length: 35}) : <Copy style={{ fontStyle: "italic" }}>select category</Copy>}</Copy>
      </View>
    )
  }

  renderAccount = (id) => {
    const { accounts } = this.props
    const account = accounts.find(acc => id === acc.id)

    return (
      // TODO: refactor this style
      <View style={{ flexDirection: "row", alignItems: "center", width: 165 }}>
        <Icon
          type={get(account, "icon", "hand-pointer")}
          textStyle={{ color: get(account, "color", "teal") }}
        />
        <Copy style={{flexWrap: "wrap", width: 120}}>{account ? truncate(account.name, {length: 30}) : <Copy style={{ fontStyle: "italic" }}>select account</Copy>}</Copy>
      </View>
    )
  }

  selectRecurringSchedule = () => {
    const { transaction } = this.state
    const { theme } = this.props
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"
    
    this.props.showActionSheetWithOptions({
      options: ["Day", "Week", "Month", "Year", "Cancel"],
      cancelButtonIndex: 4,
      title: "Select occurence interval",
      userInterfaceStyle: theme,
      containerStyle: { backgroundColor: darkMode ? palette.dark : palette.light},
      textStyle: { color: darkMode ? palette.light : palette.dark},
      titleTextStyle: { color: darkMode ? palette.lightGray : palette.gray}
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
    const { transaction, moreOptionsOpen, accountType } = this.state
    const { navigation, changeTransactionAmount, theme, accounts, labels } = this.props
    const isTransfer = transaction.type === "transfer"
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"

    return (
      <Screen style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Header title="Transaction form" style={{paddingTop: 10}} backBtn={isAndroid}/>

        <View style={styles.wrap}>

          <TransactionType setType={type => this.setState({ transaction: { ...transaction, type } })} transaction={transaction} />

          <View style={styles.formFieldWrap}>
            <Copy>Amount</Copy>
            <View>
              <Copy
                style={{ color: "teal", borderRadius: 20, zIndex: 100, fontSize: 30 }}>
                {transaction.type === "expense" && "-" }
                {transaction.type === "income" && "+" }
                {formatCurrency(transaction.amount, transaction.currency)}
              </Copy>

              <TextInput
                ref={(ref) => { this.input = ref }}
                onSubmitEditing={() => this.submitForm()}
                onChangeText={value => changeTransactionAmount(value)}
                onBlur={() => Keyboard.dismiss()}
                value={transaction?.amount?.toString()}
                style={{ backgroundColor: darkMode ? "white" : "white", width: 0, height: 0, fontSize: 0, display: "none" }}
                keyboardAppearance={darkMode ? "dark" : "light"}
                keyboardType="numeric"
                returnKeyType="done"/>
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

          <View style={isTransfer && {flexDirection: "row", justifyContent: "space-between"}}>

            { isTransfer && (
              <View style={styles.formFieldColumnWrap}>
                <Copy>From</Copy>
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

            <View style={isTransfer ? styles.formFieldColumnWrap : styles.formFieldWrap}>
              <Copy>{isTransfer ? "To " : "Account"}</Copy>
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
          </View>

          <View style={[styles.formFieldWrap, { alignItems: "center", paddingBottom: 5 }]}>
            <TextInput
              onChangeText={value => this.setState({ transaction: { ...transaction, note: value } })}
              value={transaction.note}
              placeholder="enter note..."
              placeholderTextColor="gray"
              maxLength={30}
              style={[styles.noteInput, darkMode && styles.noteInputDark]}
              keyboardAppearance={darkMode ? "dark" : "light"}/>
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
            : <FormMoreOptions
                navigation={navigation}
                transaction={transaction}
                labels={labels}
                selectSchedule={this.selectRecurringSchedule}
                submitForm={this.submitForm}
                deleteTransaction={() => this.deleteTransaction(transaction)}
                toggleRecuring={() => this.setState({ transaction: { ...transaction, recurring: !transaction.recurring } })}
                closeMoreOptions={() => this.setState({ moreOptionsOpen: false })}
                onRemoveLabel={(label) => this.removeLabel(label)}
                labelsModalRef={this.labelsModal}
                recurringCalendarModalRef={this.recurringCalendarModal}
              />}

        </View>

        { !moreOptionsOpen && (
            <CustomKeyboard
              handlePress={value => this.setState({ transaction: { ...transaction, ...{ amount: transaction.amount + value } } })}
              handleSubmit={() => this.submitForm()}
              setAmount={value => this.setState({ transaction: { ...transaction, ...{ amount: value } } })}
              del={() => transaction.amount && this.setState({
                transaction: {
                  ...transaction,
                  ...{ amount: transaction.amount.substring(0, transaction.amount.length - 1) },
                },
              })}
            />
        )}

         {/* MODALS   */}

        <SelectAccountModal 
          ref={this.accountsModal}
          transaction={transaction}
          accounts={accounts}
          navigation={this.props.navigation}
          onSelect={account => {
            accountType === "from"
              ? this.setState({ transaction: { ...transaction, fromAccountId: account.id, currency: account.currency } })
              : this.setState({ transaction: { ...transaction, accountId: account.id, currency: account.currency } })
            this.accountsModal.current.close()}}/>

        <SelectCategoryModal
          ref={this.catModal}
          navigation={this.props.navigation}
          categories={this.props.categories}
          transactions={this.props.transactions}
          onSelect={(cat) => {
            this.setState({ transaction: { ...transaction, categoryId: cat.id } })
            this.catModal.current.close()}}/>

        
        <SelectLabelsModal
          ref={this.labelsModal}
          navigation={navigation}
          transaction={transaction}
          labels={labels}
          onSelect={(label) => {
            this.setState({
              transaction: {
                ...transaction,
                ...{ labels: [...transaction.labels, { uuid: makeUUID(), ...label }] },
              },
            })
            this.labelsModal.current.close()}}/>

        

        <Modalize
          onOpen={() => Keyboard.dismiss()}
          adjustToContentHeight
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          scrollViewProps={{ scrollEnabled: false }}
          ref={this.calendarModal}>
          <View style={{ minHeight: 400, maxHeight: 400, padding: 10 }}>
            <Calendar
              renderArrow={(direction) => {
                if (direction === "left") {
                  return <Icon type="chevronLeft" textStyle={{ color: darkMode ? palette.blue : palette.darkGray }} />
                }
                if (direction === "right") {
                  return <Icon type="chevronRight" textStyle={{ color: darkMode ? palette.blue : palette.darkGray }} />
                }
              }}
              theme={{
                monthTextColor: darkMode ? palette.blue : palette.darkGray,
                arrowColor: darkMode ? palette.blue : palette.darkGray,
                dayTextColor: darkMode ? "white" : "black",
                todayTextColor: palette.blue,
                calendarBackground: darkMode ? palette.darkGray : "white",
              }}
              onDayPress={(day) => {
                this.setState({ transaction: { ...transaction, ...{ timestamp: day.timestamp } } })
                this.calendarModal.current.close()
              }}/>
          </View>
        </Modalize>

        <Modalize
          onOpen={() => Keyboard.dismiss()}
          modalHeight={400}
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          scrollViewProps={{ scrollEnabled: false }}
          ref={this.recurringCalendarModal}>
          <View style={{ minHeight: 400, maxHeight: 400, padding: 10 }}>
            <Calendar
              theme={{
                monthTextColor: darkMode ? palette.blue : palette.darkGray,
                arrowColor: darkMode ? palette.blue : palette.darkGray,
                dayTextColor: darkMode ? "white" : "black",
                todayTextColor: palette.blue,
                calendarBackground: darkMode ? palette.darkGray : "white",
              }}
              onDayPress={(day) => {
                this.setState({ transaction: { ...transaction, recurring: { ...transaction.recurring, endTimestamp: day.timestamp } } })
                this.recurringCalendarModal.current.close()
              }}/>

          </View>
        </Modalize>

      </Screen>
    );
  }
}

export default connectActionSheet(TransactionForm)
