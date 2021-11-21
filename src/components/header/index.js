import React from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { BorderlessButton } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { truncate } from "lodash"

import { Title } from "../typography"
import Icon from "../icon"
import __ from "../../utils/translations"
import styles from "./styles"
import { useDarkTheme } from "../../utils/ui-utils"

export default ({ withInsets, backBtn, backBtnPress, actionBtn, actionBtnPress, style, icon, title, children }) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, style, useDarkTheme() && styles.containerDark, withInsets ? {paddingTop: 10 + insets.top} : {paddingTop: 10}]}>
      {backBtn && (
        <BorderlessButton
          style={[styles.backBtn, withInsets ? {top: 8 + insets.top} : {top: 8}]}
          onPress={() => {
            backBtnPress ? backBtnPress() : navigation.goBack()
          }}>
          <Icon type="chevronLeft" style={{ backgroundColor: "transparent" }} textStyle={{ color: "white" }} />
        </BorderlessButton>
      )}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        {icon}
        <Title style={{ alignSelf: "center", color: "white" }}>{truncate(title)}</Title>
      </View>

      {actionBtn && (
        <TouchableOpacity style={[styles.actionBtnWrap, withInsets ? {top: 8 + insets.top} : {top: 8}]} onPress={actionBtnPress}>
          {actionBtn}
        </TouchableOpacity>
      )}

      {children}
    </View>
  )
}
