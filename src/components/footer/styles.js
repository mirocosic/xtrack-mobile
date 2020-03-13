import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"
import palette from "../../utils/palette"

export default StyleSheet.create({

  container: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: palette.lightGray,
    padding: 10,
    paddingBottom: safePaddingTop(0),
  },

  containerDark: { backgroundColor: palette.darkGray },

  backBtn: {
    zIndex: 100,
    color: "teal",
    position: "absolute",
    left: 20,
    top: 20,
  },
})
