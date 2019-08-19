import { StyleSheet } from "react-native"

export default StyleSheet.create({

  delete: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  typeButtonsWrap: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  typeButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: "black",
  },

  btnSelected: { backgroundColor: "green" },

  btnDark: { borderColor: "white" },

  copySelected: { color: "white" },

  addButton: {
    position: "absolute",
    marginTop: -20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    padding: 0,
    borderRadius: 30,
    backgroundColor: "green",
  },
})
