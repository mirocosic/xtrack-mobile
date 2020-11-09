import { StyleSheet } from "react-native"
import palette from "../../utils/palette"
import globalStyles from "../../utils/styles"

export default StyleSheet.create({

  ...globalStyles,

  wrap: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },

  rangeSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },

  accountWrap: {
    backgroundColor: "white",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },

  accountWrapDark: { backgroundColor: palette.darkGray },

})
