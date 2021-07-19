import { StyleSheet } from "react-native"
import globalStyles from "../../../utils/styles"
import palette from "../../../utils/palette"

export default StyleSheet.create({

  ...globalStyles,

  modalDark: { backgroundColor: palette.darkGray },

  modalContainer: { width: "100%", padding: 20, backgroundColor: "white", borderRadius: 10 },

  modalContainerDark: { backgroundColor: palette.darkGray }

})