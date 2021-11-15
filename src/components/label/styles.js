import { StyleSheet } from "react-native"

export default StyleSheet.create({
  labels: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
  },

  label: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 0,
    margin: 5,
    borderRadius: 20,
  },

  removeLabel: {
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 2,
    marginLeft: 5,
  },
})
