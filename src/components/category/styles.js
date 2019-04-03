import { StyleSheet } from "react-native"

export default StyleSheet.create({
  categoryWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
  },

  catWrapDark: {
    borderColor: "white",
  },

  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flex: 1,
  },

  editButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flex: 1,
  },
})
