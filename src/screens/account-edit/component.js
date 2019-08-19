import React, { Component } from "react";
import { Alert, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
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
      color: "",
      name: "",
      icon: "",
      defaultAccount: false,
    },
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      this.setState({ account: this.props.accounts.filter(item => this.props.navigation.state.params.id === item.id)[0] })
    }
  }

  handleDelete = (account) => {
    const count = this.props.transactions.filter((item) => account.id === get(item ,"account.id")).length
    if (count > 0) {
      Alert.alert("Warning", "Cannot delete account that contains transactions.")
    } else {
      this.props.remove(account)
      this.props.navigation.goBack()
    }
  }

  render() {
    const { navigation, darkMode, add, edit, remove, setDefault } = this.props
    const { account } = this.state
    return (
      <Screen>
        <Header
          icon={<Icon type={account.icon} style={{ backgroundColor: account.color }} />}
          title={account.name}
          backBtn
          actionBtn={<Icon type="trash-alt" />}
          actionBtnPress={() => this.handleDelete(account)}
        />
        <ScrollView>
          <View>

            <View style={styles.colorPicker}>
              { colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorBox, account.color === color && styles.selectedColor, { backgroundColor: color }]}
                  onPress={() => this.setState({
                    account: {
                      ...account,
                      ...{ color },
                    },
                  })}
                />
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => this.setState({
                  account: {
                    ...account,
                    ...{ name: text }
                  }})}
                returnKeyType="done"
                placeholder="account name"
                value={account.name}
                />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  account.id ? edit(account) : add(account)
                  account.defaultAccount && setDefault(account)
                  navigation.goBack()
                }}
              >
                <Copy style={{ color: "white" }}>Save</Copy>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{ flexDirection: "row", paddingLeft: 40, paddingBottom: 20 }}>
            <Copy>Default account:</Copy>
            <TouchableOpacity onPress={() => this.setState({ account: { ...account, defaultAccount: !account.defaultAccount } })}>
              <Copy style={{ color: "blue" }}>{account.defaultAccount ? "Yes" : "No"}</Copy>
            </TouchableOpacity>
          </View>

          <CategoryIcons
            selected={account.icon || "car"}
            select={value => this.setState({ account: { ...account, icon: value } })}
          />

        </ScrollView>

      </Screen>
    )
  }
}

export default withNavigation(AccountEdit)
