import { StyleSheet } from "react-native"

export default StyleSheet.create({
  typeWrap: { paddingTop: 0 },

  formFieldWrap: {
    height: 30,
    width: 340,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    borderColor: "gray",
    backgroundColor: "#999",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  transactionTypeButton: {
    textAlign: "center",
    alignItems: "center",
    width: 80,
  },

  slider: {
    height: 30,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "red",
  },
})
