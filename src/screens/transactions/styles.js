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
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "gray",
  },

  searchWrapDark: { backgroundColor: palette.dark },

  searchInnerWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  searchInnerWrapDark: { backgroundColor: palette.dark },

  searchText: {
    flex: 1,
  },

  section: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: palette.gray,
    backgroundColor: palette.light,
  },

  sectionDark: {
    backgroundColor: palette.black
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: palette.gray
  }

})
