import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"

export default StyleSheet.create({
  container: {
    backgroundColor: "teal",
    paddingTop: safePaddingTop(5),
    paddingBottom: 5,
  },

  backBtn: {
    zIndex: 100,
    color: "white",
    position: "absolute",
    top: safePaddingTop(3),
    left: 20,
  },

  actionBtnWrap: {
    position: "absolute",
    right: 20,
    top: safePaddingTop(3),
  },
})
