import React from "react"
import { View, Image } from "react-native"
import FontAwesome, { Icons } from "react-native-fontawesome"
// https://medium.com/@mehrankhandev/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4

import money from "../../../assets/icons/money.png"
import category from "../../../assets/icons/default.png"

const icons = {
  money,
  category,
}

const Icon = ({ type, textStyle, style, icon }) => (
  <View style={[{ width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: "transparent", borderRadius: 20 }, style]}>
    {type ? (
      <FontAwesome style={[{ fontSize: 16, color: "white" }, textStyle]} type="FontAwesome5Pro-Solid">
        {Icons[type]}
      </FontAwesome>
    ) : (
      <Image source={icons[icon] || null} style={{ width: 20, height: 20, tintColor: "white" }} />
    )}
  </View>
)

export default Icon
