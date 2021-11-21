import { StyleSheet } from "react-native"
import globalStyles from "../../utils/styles"
import palette from "../../utils/palette"

export default StyleSheet.create({

  ...globalStyles,

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

  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    margin: 10,
  },

  wrapDark: { borderColor: "white" },

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
    width: 200,
    borderBottomWidth: 1,
    borderColor: palette.gray,
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

  modalDark: { backgroundColor: palette.darkGray },
})
