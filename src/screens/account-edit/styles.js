import { StyleSheet } from "react-native"
import palette from "../../utils/palette"
import globalStyles from "../../utils/styles"

export default StyleSheet.create({

  ...globalStyles,

  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    color: "black",
    fontSize: 20,
    //padding: 20,
    //margin: 10,
    width: 200,
    borderBottomWidth: 1,
    borderColor: palette.gray,
  },

  inputDark: {
    color: "white",
    borderColor: "white",
  },

  add: {
    width: 200,
    height: 40,
    marginTop: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "teal",
  },

  delete: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  typeButtonsWrap: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  typeButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: "black",
  },

  btnSelected: { backgroundColor: "green" },

  btnDark: { borderColor: "white" },

  copySelected: { color: "white" },

  colorPicker: {
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 20,
  },

  colorBox: {
    margin: 5,
    width: 50,
    height: 50,
    borderRadius: 5,
  },

  selectedColor: {
    borderWidth: 2,
    borderColor: "black",
  },
})