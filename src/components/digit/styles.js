import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"

export default StyleSheet.create({

  copy: { fontSize: 18 },

  pressedCopy: {
    fontSize: 18,
    color: "white"
  },

  digit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    height: 60,
    minWidth: 50,
    margin: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "teal",
    backgroundColor: "white",
  },

  pressedDigit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    height: 60,
    minWidth: 50,
    margin: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "teal",
    backgroundColor: "teal",
  }

})
