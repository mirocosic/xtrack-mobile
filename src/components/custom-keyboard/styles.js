import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"

export default StyleSheet.create({

  wrap: {
    borderTopWidth: 1,
    borderColor: "teal",
    paddingBottom: safePaddingTop(0),
  },

  row: { flexDirection: "row" },

  copy: { fontSize: 18 },

  digit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    height: 45,
    minWidth: 50,
    margin: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "teal",
    backgroundColor: "white",
  },

})
