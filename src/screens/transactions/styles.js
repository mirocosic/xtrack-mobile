import { StyleSheet } from "react-native";

export default StyleSheet.create({

  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    marginRight: 20,
    alignSelf: "flex-end",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },

  searchWrap: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "gray",
  },

  searchInnerWrap: {
    backgroundColor: "#e6e6e6",
    flexDirection: "row",
    flex: 1,
    margin: 20,
    marginTop: 30,
    borderRadius: 10,
  },

  searchText: {
    backgroundColor: "#e6e6e6",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },

})
