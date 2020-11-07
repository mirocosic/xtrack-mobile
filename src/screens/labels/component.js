import React, { Component } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native"
import { DarkModeContext } from "react-native-dark-mode"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton } from "react-native-gesture-handler"


import { Screen, Header, Footer } from "../../components"
import { Copy, CopyBlue } from "../../components/typography"
import Icon from "../../components/icon"
import styles from "./styles"
import { isAndroid } from "../../utils/os-utils"

class Labels extends Component {

    static contextType = DarkModeContext

    state = { scroll: true }

    renderDeleteButton = label => (
      <View style={[{ width: 70 }]}>
        <RectButton
          onPress={() => this.props.remove(label.id)}
          style={styles.deleteButton}
          activeOpacity={0.5}
        >
          <Icon type="trash-alt" />
        </RectButton>
      </View>
    );

    renderEditButton = () => (
      <View style={styles.editButton}>
        <Icon style={{ backgroundColor: "blue" }} />
        <Copy style={{ color: "white" }}>Edit</Copy>
      </View>
    )

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
                <Swipeable
                  key={label.id}
                  renderRightActions={() => this.renderDeleteButton(label)}
                  containerStyle={styles.swiperWrap}
                >
                  <RectButton
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
}

export default Labels
