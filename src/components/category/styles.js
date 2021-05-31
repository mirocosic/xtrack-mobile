import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({
  categoryWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  wrap: { backgroundColor: "white" },

  wrapDark: {
    borderColor: "white",
    backgroundColor: palette.dark,
  },

  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.red,
    flex: 1,
  },

  editButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.blue,
    flex: 1,
  },
})
