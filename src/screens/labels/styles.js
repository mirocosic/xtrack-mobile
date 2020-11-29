import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

export default StyleSheet.create({

  colorPicker: { flexDirection: "row" },

  wrap: {
    padding: 10,
    paddingLeft: 30,
  },

  wrapDark: { borderColor: "white", backgroundColor: palette.dark },

  swiperWrap: {
    borderBottomWidth: 1,
    borderColor: palette.gray,
  },

  colorBox: {
    margin: 5,
    width: 50,
    height: 50,
  },

  selectedColor: {
    borderWidth: 2,
    borderColor: "black",
  },

  inputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    color: "black",
    fontSize: 20,
    padding: 20,
    margin: 20,
    width: 200,
    borderBottomWidth: 1,
  },

  inputDark: {
    color: "white",
    borderColor: "white",
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

  editButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flex: 1,
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
