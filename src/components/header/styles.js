import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"

export default StyleSheet.create({
  container: {
    backgroundColor: "teal",
    paddingTop: safePaddingTop(10),
    paddingBottom: 10,
  },

  backBtn: {
    zIndex: 100,
    color: "white",
    position: "absolute",
    top: safePaddingTop(8),
    left: 20,
  },

  actionBtnWrap: {
    position: "absolute",
    right: 20,
    top: safePaddingTop(8),
  },
})
