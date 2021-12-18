import { StyleSheet } from "react-native"
import globalStyles from "../../utils/styles"
import palette from "../../utils/palette"

export default StyleSheet.create({
  ...globalStyles,

  container: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5,
    backgroundColor: "white",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.red,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },

  containerDark: { backgroundColor: palette.dark },

  amount: { fontSize: 20 },

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

  expense: { backgroundColor: palette.red },

  income: { backgroundColor: "green" },

  tranfer: { backgroundColor: "blue" },

  labels: { flexDirection: "row" },

  label: {
    margin: 5,
    padding: 5,
  },

  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.red,
    flex: 1,
    height: 70,
  },
})
