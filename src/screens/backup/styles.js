import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
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
    backgroundColor: palette.red,
    flex: 1,
  },

  exportButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.blue,
    flex: 1,
  },

  editButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.blue,
    flex: 1,
  },

  addWrap: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  add: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: palette.blue,
    
  },
})
