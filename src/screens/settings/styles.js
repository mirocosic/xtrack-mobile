import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({
  settingWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderColor: palette.gray,
  },
})
