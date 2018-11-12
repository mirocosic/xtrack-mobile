import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  iconWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  icon: {
    fontSize: 40,
    margin: 5,
    borderWidth: 1,
    borderColor: "white"
  },

  selected: {
    borderWidth: 1,
    borderColor: "black"
  }
})
