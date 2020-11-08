import { StyleSheet } from "react-native"
import globalStyles from "../../utils/styles"
import palette from "../../utils/palette"

export default StyleSheet.create({

  ...globalStyles,

  inputContainer: {
    paddingLeft: 10,
    paddingRight: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    color: "black",
    fontSize: 20,
    margin: 20,
    width: 200,
    borderBottomWidth: 1,
    borderColor: palette.gray,
  },

  inputDark: {
    color: "white",
    borderColor: "white",
  },

  add: {
    marginTop: 50,
    width: "100%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: palette.blue,
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
    minHeight: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 20,
  },

  colorBox: {
    margin: 5,
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  selectedColor: {
    borderWidth: 2,
    borderColor: "black",
  },

  selectedColorBlack: { borderColor: "white" },

  modalDark: { backgroundColor: palette.darkGray },
})
