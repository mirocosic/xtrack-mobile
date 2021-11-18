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
    fontSize: 16,
    width: 200,
    borderBottomWidth: 1,
    borderColor: palette.gray,
    textAlign: "right"
  },

  inputDark: {
    color: "white",
    borderColor: "white",
  },


  addWrap: {
    flex: 1,
    marginLeft: 10,
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
    flexWrap: "wrap",
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: 100,
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

  modalDark: { backgroundColor: palette.darkGray },

  balanceInput: { 
    fontSize: 16, 
    borderBottomWidth: 1, 
    width: 50, 
    borderColor: palette.gray,
    textAlign: "right"
  },

  balanceInputDark: {
    borderColor: palette.light,
    color: palette.light
  }
})
