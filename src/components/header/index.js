import React from "react"
import { View, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import PropTypes from "prop-types"

import { Title } from "../typography"
import __ from "../../utils/translations"
import styles from "./styles"

const Header = ({ backBtn, backBtnPress, style, icon, title, children, navigation }) => (
  <View style={[styles.container, style]}>
    { backBtn && (
      <TouchableOpacity style={styles.backBtn} onPress={() => { backBtnPress ? backBtnPress() : navigation.goBack() }}>
        <Title style={{ color: "white" }}>{"<"}</Title>
      </TouchableOpacity>
    )}
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      {icon}
      <Title style={{ alignSelf: "center", color: "white" }}>{__(title)}</Title>
    </View>

    {children}
  </View>
)

export default withNavigation(Header)
