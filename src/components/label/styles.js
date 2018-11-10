import { StyleSheet } from "react-native"

export default StyleSheet.create({
  labels: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "black",
    padding: 20
  },

  label: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderRadius: 15
  },

  removeLabel:{
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10
  }
})
