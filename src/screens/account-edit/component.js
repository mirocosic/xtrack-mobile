import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity} from "react-native";
import { withNavigation } from "react-navigation";
import { Screen, Header, Footer } from "../../components"
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
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      this.setState({ account: this.props.accounts.filter(item => this.props.navigation.state.params.id === item.id)[0] })
    }
  }

  render() {
    const { navigation, darkMode } = this.props
    const { account } = this.state
    return (
      <Screen>
        <Header
          icon={<Icon type={account.icon} style={{ backgroundColor: account.color }} />}
          title={account.name}
          backBtn
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
                onChangeText={(text)=>this.setState({
                  account: {
                    ...account,
                    ...{name: text}
                  }})}
                returnKeyType="done"
                placeholder="account name"
                value={account.name}
                />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  this.props.edit(account)
                  navigation.goBack()
                }}
              >
                <Copy style={{ color: "white" }}>Save</Copy>
              </TouchableOpacity>
            </View>

          </View>

          <CategoryIcons selected={account.icon || "car"} select={(value) => this.setState({account: {...account, icon: value}})}/>

        </ScrollView>

      </Screen>
    )
  }
}

export default withNavigation(AccountEdit)
