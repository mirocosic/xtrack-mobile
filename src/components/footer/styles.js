import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"

export default StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "gray",
    padding: 10,
    paddingBottom: safePaddingTop(0),
  },

  backBtn: {
    zIndex: 100,
    color: "teal",
    position: "absolute",
    left: 20,
    top: 20,
  },
})
