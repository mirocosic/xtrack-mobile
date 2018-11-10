import { StyleSheet } from "react-native"

export default StyleSheet.create({

    wrap: {
      paddingLeft: 20,
      paddingRight: 20
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    welcome: {
      color: "white",
      textAlign: 'center',
      padding: 10,
      marginBottom: 30,
      backgroundColor: "teal"
    },

    textInput: {
      color: "black",
      fontSize: 20,
      width: 200,
      padding: 10,
      margin: 10
    },

    textInputDark: {
      color: "white",
      fontSize: 20,
      width: 200,
      borderBottomWidth: 1,
      borderColor: "white",
      padding: 10,
      margin: 10
    },

    amountInput: {
      color: "gray",
      fontSize: 40,
      width: 200,

      margin: 10
    },

    amountInputDark: {
      color: "white",
    },

    typeButtonsWrap: {
      flexDirection: "row",
      justifyContent: "space-evenly"
    },

    typeButton: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderWidth: 1,
      borderColor: "black"
    },

    btnExpenseSelected: {
      backgroundColor: "red",
    },

    btnIncomeSelected: {
      backgroundColor: "green",
    },

    btnTransferSelected: {
      backgroundColor: "blue",
    },

    btnDark: {
      borderColor: "white"
    },

    copySelected: {
      color: "white"
    },

    selectBox: {
      backgroundColor: "white",
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },

    selectBoxDark: {
      borderColor: "white"
    },



})
