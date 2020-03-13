import { StyleSheet } from "react-native"
import { safePaddingBottom } from "../../utils/ui-utils"
import palette from "../../utils/palette"

export default StyleSheet.create({

  wrap: {
    backgroundColor: palette.light,
    borderColor: palette.blue,
    paddingBottom: safePaddingBottom(0),
  },

  wrapDark: { backgroundColor: palette.dark },

  row: { flexDirection: "row" },

  copy: { fontSize: 22 },

  pressedCopy: {
    fontSize: 22,
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

  digitDark: { backgroundColor: palette.darkGray, color: "white" },

})
