import { StyleSheet } from "react-native"
import palette from "../../utils/palette"
import globalStyles from "../../utils/styles"

export default StyleSheet.create({

  ...globalStyles,

  wrap: {
    
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },

  rangeSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },

  accountWrap: {
    backgroundColor: "white",
    marginHorizontal: 10,
    width: 300,
    padding: 10,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  accountWrapDark: { 
    backgroundColor: palette.darkGray,
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
  }

})
