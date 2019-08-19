import { StyleSheet } from "react-native"
import { safePaddingTop } from "../../utils/ui-utils"

export default StyleSheet.create({
  container: { backgroundColor: "white" },

  content: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: safePaddingTop(10),
  },

  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

})
