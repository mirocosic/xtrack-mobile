import { StyleSheet } from "react-native"
import palette from "../../utils/palette"

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

  searchWrapDark: { backgroundColor: palette.dark },

  searchInnerWrap: {
    backgroundColor: "#e6e6e6",
    flexDirection: "row",
    flex: 1,
    margin: 25,
    marginTop: 30,
    borderRadius: 10,
  },

  searchInnerWrapDark: { backgroundColor: palette.darkGray },

  searchText: {
    backgroundColor: "#e6e6e6",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 0,
  },

  searchTextDark: { backgroundColor: palette.darkGray },

})
