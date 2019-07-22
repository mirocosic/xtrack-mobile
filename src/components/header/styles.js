import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"

export default StyleSheet.create({
  container: {
    backgroundColor: "teal",
    paddingTop: safePaddingTop(20),
    paddingBottom: 20,
  },

  backBtn: {
    zIndex: 100,
    color: "white",
    position: "absolute",
    top: safePaddingTop(20),
    left: 20,
  },
})
