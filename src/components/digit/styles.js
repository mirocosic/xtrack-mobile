import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({

  copy: { fontSize: 22 },
  copySmall: { fontSize: 14 },

  pressedCopy: {
    fontSize: 22,
    color: "white",
  },

  pressedCopySmall: {
    fontSize: 16,
    color: "white",
  },

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

  pressedDigit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    height: 60,
    minWidth: 50,
    margin: 2,
    borderRadius: 2,
    backgroundColor: palette.blue,
  }

})
