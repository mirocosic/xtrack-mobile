import { StyleSheet, Dimensions } from "react-native";
import palette from "../../utils/palette"
import globalStyles from "../../utils/styles"

export default StyleSheet.create({

  ...globalStyles,

  accountCard: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },

  accountCardDark: { backgroundColor: palette.dark },

  accountDetails: { paddingLeft: 20 },

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

  monthContainer: {
    height: "100%",
    width: Dimensions.get("window").width,
    padding: 20,
    paddingTop: 20,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },

  modal: {
    marginBottom: 0,
    paddingBottom: 0,
    backgroundColor: "white",
  },

  chartTab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 10, 
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white"
  },

  chartTabSelected: {
    backgroundColor: palette.blue
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: palette.gray

  }


})
