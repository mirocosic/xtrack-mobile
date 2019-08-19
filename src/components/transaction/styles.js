import { StyleSheet } from "react-native";
import palette from "../../utils/palette"

export default StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "white",
  },

  containerDark: {
    backgroundColor: palette.dark,
  },

  amount: {
    fontSize: 20,
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
    marginRight: 10,
  },

  expense: {
    backgroundColor: "red",
  },

  income: {
    backgroundColor: "green",
  },

  tranfer: {
    backgroundColor: "blue",
  },

  labels: {
    flexDirection: "row",
  },

  label: {
    margin: 5,
    padding: 5,
  },

  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flex: 1,
    height: 70,
  },

})
