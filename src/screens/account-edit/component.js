import React, { Component } from "react"
import { Alert, ScrollView, View, TextInput, TouchableOpacity } from "react-native"
import { Modalize } from "react-native-modalize"
import { DarkModeContext } from "react-native-dark-mode"
import { get } from "lodash"

import { Screen, Header } from "../../components"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy, CopyBlue } from "../../components/typography"
import palette from "../../utils/palette"
import styles from "./styles"

const colors = ["#FF5722", "#F39A27", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class AccountEdit extends Component {

  static contextType = DarkModeContext

  state = {
    account: {
      color: "#0097A7",
      name: "",
      icon: "creditCard",
      defaultAccount: false,
      startingBalance: "0",
      currency: "HRK",
    },
  }

  input = React.createRef()

  iconsModal = React.createRef()

  colorModal = React.createRef()

  currencyModal = React.createRef()

  componentDidMount() {
    const { route, accounts } = this.props
    if (route.params && route.params.id) {
      this.setState({ account: accounts.filter(item => route.params.id === item.id)[0] })
    }
  }

  handleSave = (account) => {
    const { edit, add, setDefault, navigation } = this.props
    account.id ? edit(account) : add(account)
    account.defaultAccount && setDefault(account)
    navigation.goBack()
  }

  handleDelete = (account) => {
    const { remove, removeTransactions, navigation, transactions } = this.props
    const count = transactions.filter(item => account.id === get(item, "account.id")).length
    if (count > 0) {
      Alert.alert(
        "Warning!",
        "Cannot delete account that contains transactions",
        [{
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete all transactions",
          onPress: () => { removeTransactions(account); remove(account); navigation.goBack() },
        }],
      )
    } else {
      remove(account)
      navigation.goBack()
    }
  }

  render() {
    const darkMode = this.context === "dark"
    const { account } = this.state
    return (
      <Screen>
        <Header
          icon={<Icon type={account.icon} textStyle={{ color: account.color }} />}
          title={account.name}
          backBtn
          actionBtn={<Icon type="trash-alt" />}
          actionBtnPress={() => this.handleDelete(account)}
        />

        <ScrollView style={{ padding: 20 }}>
          <View style={styles.inputContainer}>

            <Copy>Name</Copy>
            <TextInput
              ref={this.input}
              style={[styles.input, darkMode && styles.inputDark]}
              onChangeText={text => this.setState({
                account: {
                  ...account,
                  ...{ name: text },
                },
              })}
              placeholder="account name"
              placeholderTextColor="gray"
              value={account.name}
              autoFocus={!account.name}
              />
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Icon</Copy>
            <TouchableOpacity onPress={() => this.iconsModal.current.open()}>
              <Icon type={account.icon} textStyle={{ color: account.color, fontSize: 30 }} />
            </TouchableOpacity>
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Color</Copy>
            <TouchableOpacity onPress={() => this.colorModal.current.open()}>
              <View style={{ width: 40, height: 40, backgroundColor: account.color, borderRadius: 5 }} />
            </TouchableOpacity>
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Default account</Copy>
            <TouchableOpacity onPress={() => this.setState({ account: { ...account, defaultAccount: !account.defaultAccount } })}>
              <CopyBlue style={{ fontSize: 20 }}>{account.defaultAccount ? "Yes" : "No"}</CopyBlue>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputContainer, { marginTop: 10, marginBottom: 10 }]}>
            <Copy>Starting Balance</Copy>
            <TextInput
              style={[{ fontSize: 20, borderBottomWidth: 1, width: 50 }, darkMode && { color: "gray" }]}
              keyboardType="numeric"
              onChangeText={text => this.setState({
                account: {
                  ...account,
                  ...{ startingBalance: text },
                },
              })}
              placeholderTextColor="gray"
              value={account.startingBalance}
            />
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Currency</Copy>
            <TouchableOpacity onPress={() => this.currencyModal.current.open()}>
              <CopyBlue style={{ fontSize: 20 }}>{account.currency || "HRK"}</CopyBlue>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.add}
            onPress={() => this.handleSave(account)}>
            <Copy style={{ color: "white" }}>Save</Copy>
          </TouchableOpacity>

        </ScrollView>

        <Modalize
          adjustToContentHeight
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          ref={this.iconsModal}>
          <View style={{ padding: 20 }}>
            <CategoryIcons
              selected={account.icon || "car"}
              select={(value) => {
                this.setState({ account: { ...account, icon: value } })
                this.iconsModal.current.close()
              }}
            />
          </View>
        </Modalize>

        <Modalize
          adjustToContentHeight
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          ref={this.colorModal}
        >
          <View style={styles.colorPicker}>
            { colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBox, account.color === color && styles.selectedColor, { backgroundColor: color }]}
                onPress={() => {
                  this.setState({ account: { ...account, ...{ color } } })
                  this.colorModal.current.close()
                }}
              />
            ))}
          </View>
        </Modalize>

        <Modalize
          adjustToContentHeight
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          ref={this.currencyModal}>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{ margin: 20 }}
              onPress={() => {
                this.setState({ account: { ...account, currency: "HRK" } })
                this.currencyModal.current.close()
              }}>
              <Copy style={{ fontSize: 14 }}>HRK - Croatian Kuna</Copy>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ margin: 20 }}
              onPress={() => {
                this.setState({ account: { ...account, currency: "EUR" } })
                this.currencyModal.current.close()
              }}
            >
              <Copy style={{ fontSize: 14 }}>EUR - European Euro</Copy>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ margin: 20 }}
              onPress={() => {
                this.setState({ account: { ...account, currency: "USD" } })
                this.currencyModal.current.close()
              }}
            >
              <Copy style={{ fontSize: 14 }}>USD - United States Dollar</Copy>
            </TouchableOpacity>

          </View>
        </Modalize>

      </Screen>
    )
  }
}

export default AccountEdit
