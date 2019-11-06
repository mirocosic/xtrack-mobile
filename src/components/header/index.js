import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import { Title } from "../typography"
import Icon from "../icon"
import __ from "../../utils/translations"
import styles from "./styles"

class Header extends Component {

  state = {}

  render() {
    const { backBtn, backBtnPress, actionBtn, actionBtnPress, style, icon, title, children, navigation } = this.props
    return (
      <View style={[styles.container, style]}>
        { backBtn && (
          <TouchableOpacity style={styles.backBtn} onPress={() => { backBtnPress ? backBtnPress() : navigation.goBack() }}>
            <Icon type="chevronLeft" style={{ backgroundColor: "transparent" }} textStyle={{ color: "white" }} />
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40 }}>
          {icon}
          <Title style={{ alignSelf: "center", color: "white" }}>{__(title)}</Title>
        </View>

        { actionBtn && (
          <TouchableOpacity style={styles.actionBtnWrap} onPress={actionBtnPress}>
            { actionBtn }
          </TouchableOpacity>
        )}

        {children}
      </View>
    )
  }
}

export default withNavigation(Header)
