import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({

  copy: { fontSize: 22 },

  copyDark: { color: "white" },

  copySmall: { fontSize: 14 },

  pressedCopy: { color: "white" },

  digit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    height: 60,
    minWidth: 50,
    margin: 2,
    borderRadius: 2,
    backgroundColor: "white",
  },

  digitDark: {
    backgroundColor: palette.darkGray,
    color: "white",
  },

  pressedDigit: { backgroundColor: palette.blue },

})
