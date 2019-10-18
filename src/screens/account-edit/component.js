import React, { Component } from "react";
import { Alert, ScrollView, View, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Modalize from "react-native-modalize"
import { get } from "lodash"
import { Screen, Header } from "../../components"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy } from "../../components/typography"
import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class AccountEdit extends Component {

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
    if (this.props.navigation.state.params) {
      this.setState({ account: this.props.accounts.filter(item => this.props.navigation.state.params.id === item.id)[0] })
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
    const { navigation, darkMode, add, edit, remove, setDefault } = this.props
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
                  ...{ name: text }
                }})}
              returnKeyType="done"
              onSubmitEditing={() => this.handleSave(account)}
              placeholder="account name"
              value={account.name}
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
              <Copy style={{ color: "blue" }}>{account.defaultAccount ? "Yes" : "No"}</Copy>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputContainer, {marginTop: 10, marginBottom: 10}]}>
            <Copy>Starting Balance</Copy>
            <TextInput
              style={{ fontSize: 20, borderBottomWidth: 1, width: 50 }}
              keyboardType="numeric"
              onChangeText={text => this.setState({
                account: {
                  ...account,
                  ...{ startingBalance: text }
                }})}
              value={account.startingBalance}
            />
          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Currency</Copy>
            <TouchableOpacity onPress={() => this.currencyModal.current.open() }>
              <Copy style={{ color: "blue" }}>{account.currency || "HRK"}</Copy>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.add}
            onPress={() => this.handleSave(account)}>
            <Copy style={{ color: "white" }}>Save</Copy>
          </TouchableOpacity>

        </ScrollView>

        <Modalize
          modalHeight={300}
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
          modalHeight={200}
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
          modalHeight={300}
          ref={this.currencyModal}>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{margin: 20}}
              onPress={() => {
                this.setState({ account: { ...account, currency: "HRK"} })
                this.currencyModal.current.close()}}>
              <Copy style={{fontSize: 20}}>HRK - Croatian Kuna</Copy>
            </TouchableOpacity>

            <TouchableOpacity
              style={{margin: 20}}
              onPress={() => {
                this.setState({ account: { ...account, currency: "EUR"} })
                this.currencyModal.current.close()}}
            >
              <Copy style={{fontSize: 20}}>EUR - European Euro</Copy>
            </TouchableOpacity>

          </View>
        </Modalize>

      </Screen>
    )
  }
}

export default withNavigation(AccountEdit)
