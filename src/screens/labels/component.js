import React from "react"
import { View, ScrollView, TouchableOpacity, useColorScheme } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton } from "react-native-gesture-handler"

import { Screen, Header, Footer } from "../../components"
import { Copy, CopyBlue } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"
import { isAndroid } from "../../utils/os-utils"

const renderDeleteButton = (label, remove) => (
  <View style={[{ width: 70 }]}>
    <RectButton
      onPress={() => remove(label.id)}
      style={styles.deleteButton}
      activeOpacity={0.5}>
      <Icon type="trash-alt" />
    </RectButton>
  </View>
)

const Labels = ({ remove, navigation, labels }) => {
  const darkMode = useColorScheme() === "dark"

  return (
    <Screen>
      <Header title="Tags" backBtn />
      <ScrollView>
        <View>
          {labels.map(label => (
            <Swipeable
              key={label.id}
              renderRightActions={() => renderDeleteButton(label, remove)}
              containerStyle={styles.swiperWrap}>
              <RectButton
                key={label.id}
                style={[styles.wrap, darkMode && styles.wrapDark]}
                onPress={() => navigation.navigate("LabelEdit", { label })}>
                <View key={label.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 30, height: 30, backgroundColor: label.color, marginRight: 10, borderRadius: 50 }} />
                    <Copy>{label.name}</Copy>
                  </View>

                  <Icon
                    type="chevronRight"
                    style={{ backgroundColor: "transparent" }}
                    textStyle={{ color: "gray" }} />

                </View>

              </RectButton>
            </Swipeable>
          ))}
        </View>
      </ScrollView>

      <Footer>
        <View style={[{ alignItems: "center" }, isAndroid && { paddingBottom: 10 }]}>
          <RectButton
            hitSlop={{ top: 10, botton: 10, left: 10, right: 10 }}
            onPress={() => navigation.navigate("LabelEdit", { label: { color: "#0097A7" } })}>
            <CopyBlue>Add new tag</CopyBlue>
          </RectButton>
        </View>
      </Footer>

    </Screen>
  )
}

export default Labels
