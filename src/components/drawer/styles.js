import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"
import palette from "../../utils/palette"

export default StyleSheet.create({
  container: { backgroundColor: "white" },

  content: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: safePaddingTop(10),
  },

  contentDark: { backgroundColor: palette.dark },

  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

})
