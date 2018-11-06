import { StyleSheet } from "react-native";

export default StyleSheet.create({

    overview: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20
    },

    addButton: {
      position: "absolute",
      bottom: 20,
      marginRight: 20,
      alignSelf: "flex-end",
      right: 0,
      alignItems:"center",
      justifyContent: "center",
      width: 60,
      height: 60,
      padding: 0,
      borderRadius: 30,
      backgroundColor: "green"
    }

})
