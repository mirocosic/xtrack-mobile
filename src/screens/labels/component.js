import React from "react"
import { View, ScrollView, useColorScheme, TouchableOpacity } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Screen, Header } from "../../components"
import { Copy } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"
import { isAndroid } from "../../utils/os-utils"
import { useDarkTheme } from "../../utils/ui-utils"
import palette from "../../utils/palette"

const renderDeleteButton = (label, deleteLabel) => (
  <View style={[{ width: 70 }]}>
    <RectButton onPress={() => deleteLabel(label.id)} style={styles.deleteButton} activeOpacity={0.5}>
      <Icon type="trash-alt" />
    </RectButton>
  </View>
)

const Labels = ({ deleteLabel, navigation, labels }) => {
  const insets = useSafeAreaInsets()
  const darkMode = useDarkTheme()

  return (
    <Screen>
      <Header title="Tags" backBtn withInsets />
      <ScrollView contentContainerStyle={{paddingBottom: insets.bottom + 50}}>
        <View>
          {labels.map(label => (
            <Swipeable key={label.id} renderRightActions={() => renderDeleteButton(label, deleteLabel)} containerStyle={styles.swiperWrap}>
              <RectButton 
                key={label.id} 
                style={[styles.wrap, darkMode && styles.wrapDark]}
                activeOpacity={darkMode ? 0.5 : 0.1}
                rippleColor={darkMode ? palette.darkGray : palette.lightBlue}
                onPress={() => navigation.navigate("LabelEdit", { label })}>
                <View key={label.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 30, height: 30, backgroundColor: label.color, marginRight: 10, borderRadius: 50 }} />
                    <Copy>{label.name}</Copy>
                  </View>

                  <Icon type="chevronRight" style={{ backgroundColor: "transparent" }} textStyle={{ color: "gray" }} />
                </View>
              </RectButton>
            </Swipeable>
          ))}
        </View>
      </ScrollView>

      <View style={[isAndroid && { paddingBottom: 10 }, { width: "80%", left: "10%", bottom: insets.bottom, position: "absolute" }]}>
        <TouchableOpacity onPress={() => navigation.navigate("LabelEdit", { label: { color: "#0097A7" } })}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#2292f4", "#2031f4"]} style={[{ height: 50, width: 200 }, styles.add]}>
            <Copy style={{ color: "white" }}>Add new tag</Copy>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

export default Labels
