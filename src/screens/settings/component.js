import React, { Component } from "react"
import { View, Switch, Alert, TouchableOpacity } from "react-native"
import { RectButton } from "react-native-gesture-handler"

import Icon from "../../components/icon"
import Screen from "../../components/screen"
import { Copy } from "../../components/typography"
import __ from "../../utils/translations"
import styles from "./styles"
import { useDarkTheme } from "../../utils/ui-utils"
import palette from "../../utils/palette"

///class Settings extends Component {
export default (props) => {
  const selectLanguage = () => {
    const { setLanguage } = props
    Alert.alert(
      __("Select language"),
      __("Please choose your preferred language"),
      [
        {
          text: "English",
          onPress: () => setLanguage({ code: "eng", name: "English" }),
        },
        {
          text: "Hrvatski",
          onPress: () => setLanguage({ code: "hrv", name: "Hrvatski" }),
        },
      ],
    )
  }

  const selectTheme = () => {
    const { setTheme } = props
    Alert.alert(
      __("Select theme"),
      __("Please choose your preferred app theme"),
      [
        { text: "Light", onPress: () => setTheme("light") },
        { text: "Dark", onPress: () => setTheme("dark") },
        { text: "System", onPress: () => setTheme("system") },
      ],
    )
  }

  const generateTransactions = () => {
    const { accounts, categories, add } = props
    const defaultAccount = accounts.find(acc => acc.defaultAccount)
    const defaultCategory = categories.find(cat => cat.defaultCategory)

    for (let i = 0; i < 300; i++) {
      add({
        timestamp: Date.now() - i * 86400000,
        type: "expense",
        categoryId: defaultCategory?.id,
        accountId: defaultAccount?.id,
        amount: 37,
        labels: [],
      })
    }
  }

    const {
      navigation,
      openOnForm,
      toggleOpenOnForm,
      language,
      theme,
    } = props

    return (
      <Screen style={{ paddingTop: 20, justifyContent: "space-between"}}>
        <View>
          <View style={styles.settingWrap} />

          <View style={styles.settingWrap}>
            <RectButton
              onPress={() => navigation.navigate("Categories")}
              rippleColor={useDarkTheme() ? palette.darkGray : palette.lightBlue}
              style={styles.settingContent}>
              <View>
                <Copy>Categories</Copy>
                <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                  Customize categories to group your transactions
                </Copy>
              </View>

              <Icon
                type="chevronRight"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ color: "gray" }}
              />
            </RectButton>
          </View>

          <View style={styles.settingWrap}>
            <RectButton
              onPress={() => navigation.navigate("Accounts")}
              rippleColor={useDarkTheme() ? palette.darkGray : palette.lightBlue}
              style={styles.settingContent}>
              <View>
                <Copy>Accounts</Copy>
                <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                  Create separate accounts for your transactions
                </Copy>
              </View>
              <Icon
                type="chevronRight"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ color: "gray" }}
              />
            </RectButton>
          </View>

          <View style={styles.settingWrap}>
            <RectButton
              onPress={() => navigation.navigate("Labels")}
              rippleColor={useDarkTheme() ? palette.darkGray : palette.lightBlue}
              style={styles.settingContent}>
              <View>
                <Copy>Tags</Copy>
                <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                  Tag your transactions with labels for easy tracking
                </Copy>
              </View>
              <Icon
                type="chevronRight"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ color: "gray" }}
              />
            </RectButton>
          </View>

          <View style={styles.settingWrap}>
            <RectButton
              onPress={() => navigation.navigate("Backup")}
              rippleColor={useDarkTheme() ? palette.darkGray : palette.lightBlue}
              style={styles.settingContent}>
              <View style={{ maxWidth: 300 }}>
                <Copy>Backup/Restore</Copy>
                <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                  Make a local backup of your data and restore it if you delete the
                  app.
                </Copy>
              </View>
              <Icon
                type="chevronRight"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ color: "gray" }}
              />
            </RectButton>
          </View>

          <View style={styles.settingWrap}>
            <RectButton
              onPress={() => navigation.navigate("Onboarding")}
              rippleColor={useDarkTheme() ? palette.darkGray : palette.lightBlue}
              style={styles.settingContent}>
              <View>
                <Copy>Onboarding</Copy>
                <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                  Check out the onboarding carousel!
                </Copy>
              </View>

              <Icon
                type="chevronRight"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ color: "gray" }}
              />
            </RectButton>
          </View>

          <View style={styles.settingWrap}>
            <RectButton
              onPress={() => generateTransactions()}
              rippleColor={useDarkTheme() ? palette.darkGray : palette.lightBlue}
              style={styles.settingContent}>
              <View>
                <Copy>Dummy Data</Copy>
                <Copy style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                  Generate Demo Dummy Transactions (x100)
                </Copy>
              </View>

              <Icon
                type="chevronRight"
                style={{ backgroundColor: "transparent" }}
                textStyle={{ color: "gray" }}
              />
            </RectButton>
          </View>

          <View style={{ padding: 20 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Copy>Open app on transaction form</Copy>
              <Switch value={openOnForm} onValueChange={toggleOpenOnForm} />
            </View>

            {/* <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", display: "none" }}>
              <Copy>Language</Copy>
              <TouchableOpacity onPress={selectLanguage}>
                <Copy>{language.name}</Copy>
              </TouchableOpacity>
            </View> */}

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Copy>Theme</Copy>
              <TouchableOpacity onPress={selectTheme}>
                <Copy>{theme}</Copy>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Copy style={{ textAlign: "right", marginBottom: 10, marginRight: 10}}>
           v1.0.16 (43)
        </Copy>
      </Screen>
    )
}
