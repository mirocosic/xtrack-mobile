import React from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Title } from "../typography"
import Icon from "../icon"
import __ from "../../utils/translations"
import styles from "./styles"
import { useDarkTheme } from "../../utils/ui-utils"

export default ({ backBtn, backBtnPress, actionBtn, actionBtnPress, style, icon, title, children }) => {
  const navigation = useNavigation()

  return (
    <View style={[styles.container, style, useDarkTheme() && styles.containerDark]}>
      {backBtn && (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            backBtnPress ? backBtnPress() : navigation.goBack()
          }}>
          <Icon type="chevronLeft" style={{ backgroundColor: "transparent" }} textStyle={{ color: "white" }} />
        </TouchableOpacity>
      )}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {icon}
        <Title style={{ alignSelf: "center", color: "white" }}>{__(title)}</Title>
      </View>

      {actionBtn && (
        <TouchableOpacity style={styles.actionBtnWrap} onPress={actionBtnPress}>
          {actionBtn}
        </TouchableOpacity>
      )}

      {children}
    </View>
  )
}
