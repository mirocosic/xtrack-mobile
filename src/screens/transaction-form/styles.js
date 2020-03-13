import { StyleSheet } from "react-native"
import globalStyles from "../../utils/styles"
import palette from "../../utils/palette"

export default StyleSheet.create({

  ...globalStyles,

  wrap: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },

  formFieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  welcome: {
    color: "white",
    textAlign: "center",
    padding: 10,
    marginBottom: 30,
    backgroundColor: "teal",
  },

  textInput: {
    color: "black",
    margin: 10,
    width: 100,
    backgroundColor: "white",
  },

  textInputDark: {
    color: "white",
    fontSize: 20,
    width: 200,
    borderBottomWidth: 1,
    // borderColor: "white",
    padding: 10,
    margin: 10,
    backgroundColor: palette.darkGray,
  },

  amountInput: {
    color: "gray",
    fontSize: 40,
    width: 200,
    margin: 10,
  },

  amountInputDark: { color: "white" },

  transactionTypeButton: {
    margin: 10,
    borderRadius: 5,
  },

  typeWrap: {
    paddingTop: 5,
    paddingBottom: 5,
    padding: 10,
    borderRadius: 5,
  },

  typeButtonsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnExpenseSelected: { backgroundColor: "red" },

  btnIncomeSelected: { backgroundColor: "green" },

  btnTransferSelected: { backgroundColor: "blue" },

  btnDark: { borderColor: "white" },

  copySelected: { color: "white" },

  selectBox: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  selectBoxDark: { color: "white", borderColor: "white", backgroundColor: palette.darkGray },

  labels: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarWrap: {
    position: "absolute",
    flex: 1,
    bottom: 10,
    width: "100%",
    backgroundColor: "gray",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },

  modalDark: { backgroundColor: palette.darkGray },

  modalContainer: { width: "100%", padding: 20, backgroundColor: "white", borderRadius: 10 },

  modalContainerDark: { backgroundColor: palette.darkGray },

})
