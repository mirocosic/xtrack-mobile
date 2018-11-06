import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  amount: {
    fontSize: 20
  },


  deleteTrans: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  colorCode: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10
  },

  expense: {
    backgroundColor: "red",
  },

  income: {
    backgroundColor: "green"
  },

  tranfer: {
    backgroundColor: "blue"
  }
})
