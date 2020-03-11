import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"
import palette from "../../utils/palette"

export default StyleSheet.create({
  container: {
    backgroundColor: palette.blue,
    paddingTop: safePaddingTop(10),
    paddingBottom: 10,
  },

  containerDark: { backgroundColor: palette.darkGray },

  backBtn: {
    zIndex: 100,
    color: "white",
    position: "absolute",
    top: safePaddingTop(8),
    left: 20,
  },

  actionBtnWrap: {
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: safePaddingTop(8),
  },
})
