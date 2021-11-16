import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({
  settingWrap: {
    borderBottomWidth: 1,
    borderColor: palette.gray,
  },

  settingContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  }
})
