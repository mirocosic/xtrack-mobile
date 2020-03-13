import React, { Component } from "react"
import { Alert, View, ScrollView, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import Swipeout from "react-native-swipeout"
import { get } from "lodash"
import { DarkModeContext } from "react-native-dark-mode"

import { Screen, Header, Footer } from "../../components"
import { Copy, CopyBlue } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"

class Labels extends Component {

    static contextType = DarkModeContext

    state = { scroll: true }

    renderDeleteButton = () => (
      <View style={styles.deleteButton}>
        <Icon type="trash-alt" />
      </View>
    );

    renderEditButton = () => (
      <View style={styles.editButton}>
        <Icon style={{ backgroundColor: "blue" }} />
        <Copy style={{ color: "white" }}>Edit</Copy>
      </View>
    )

    handleDelete = (id) => {
      const { transactions, deleteAccount } = this.props
      const count = transactions.filter(item => id === get(item, "account.id")).length
      if (count > 0) {
        Alert.alert("Warning", "Cannot delete account that contains transactions.")
      } else {
        deleteAccount(id)
      }
    }


    render() {
      const { navigation, labels } = this.props
      const { scroll } = this.state
      const darkMode = this.context === "dark"

      return (
        <Screen>
          <Header title="Tags" backBtn />
          <ScrollView scrollEnabled={scroll}>
            <View>
              {labels.map(label => (
                <Swipeout
                  key={label.id}
                  right={[{
                    backgroundColor: "#f8f8fc",
                    component: this.renderDeleteButton(),
                    onPress: () => this.handleDelete(label.id),
                  }]}
                  style={styles.swiperWrap}
                  sensitivity={10}
                  buttonWidth={70}
                  backgroundColor="#f8f8fc"
                  scroll={value => this.setState({ scroll: value })}
                >
                  <TouchableOpacity
                    key={label.id}
                    onPress={() => navigation.navigate("LabelEdit", { label })}
                  >
                    <View key={label.id} style={[styles.wrap, darkMode && styles.wrapDark]}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 30, height: 30, backgroundColor: label.color, marginRight: 10, borderRadius: 50 }} />
                        <Copy>{label.name}</Copy>
                      </View>

                      <TouchableOpacity onPress={() => navigation.navigate("LabelEdit")}>
                        <Icon
                          type="chevronRight"
                          style={{ backgroundColor: "transparent" }}
                          textStyle={{ color: "gray" }}
                        />
                      </TouchableOpacity>

                    </View>

                  </TouchableOpacity>
                </Swipeout>
              ))}
            </View>
          </ScrollView>
          <Footer>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.navigate("LabelEdit", { label: {} })}>
                <CopyBlue>Add new tag</CopyBlue>
              </TouchableOpacity>
            </View>
          </Footer>

        </Screen>
      )
    }
}

export default withNavigation(Labels);
