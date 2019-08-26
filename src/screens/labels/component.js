import React, { Component } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import Swipeout from "react-native-swipeout"
import { Screen, Header, Footer } from "../../components"
import { Copy } from "../../components/typography"
import Icon from "../../components/icon"

import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class Labels extends Component {

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
      const count = this.props.transactions.filter((item) => id === get(item ,"account.id")).length
      if ( count > 0 ) {
        Alert.alert("Warning", "Cannot delete account that contains transactions.")
      } else {
        this.props.deleteAccount(id)
      }
    }


    render() {
      const { navigation, labels, remove, darkMode, select } = this.props

      return (
        <Screen>
          <Header title="Labels" backBtn />
          <ScrollView>
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

                      <TouchableOpacity onPress={() => {
                        //selectCategory(cat)
                        navigation.navigate("LabelEdit")
                      }}>
                        <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
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
                <Copy style={{ color: "teal" }}>Add new label</Copy>
              </TouchableOpacity>
            </View>
          </Footer>

        </Screen>
      )
    }
}

export default withNavigation(Labels);
