import { StyleSheet, Dimensions } from "react-native";
import palette from "../../utils/palette"

export default StyleSheet.create({

  accountCard: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },

  accountCardDark: {
    backgroundColor: palette.dark
  },

  accountDetails: {
    paddingLeft: 20,
  },

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
    width: Dimensions.get('window').width,
    padding: 20,
  },

  row: {
    display: "flex",
    flexDirection: "row",
  },

})
