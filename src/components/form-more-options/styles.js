import { StyleSheet } from "react-native"
import globalStyles from "../../utils/styles"

export default StyleSheet.create({

  ...globalStyles,

  formFieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  labels: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

})
