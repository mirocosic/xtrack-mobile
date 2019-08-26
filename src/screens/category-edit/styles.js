import { StyleSheet } from "react-native"


export default StyleSheet.create({

  inputContainer: {
    paddingLeft: 10,
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

  add: {
    width: 70,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 10,
  },

  selectedColor: {
    borderWidth: 2,
    borderColor: "black",
  },
})
