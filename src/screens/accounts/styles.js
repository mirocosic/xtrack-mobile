import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({

  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

  wrapDark: {
    borderColor: "white",
    backgroundColor: palette.dark,
  },

  swiperWrap: {
    borderBottomWidth: 1,
    borderColor: palette.gray,
  },

  delete: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flex: 1,
  },

  editButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flex: 1,
  },

})
