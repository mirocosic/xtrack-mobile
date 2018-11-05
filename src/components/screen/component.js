import React, { Component } from "react";
import { View , StyleSheet} from "react-native";

import palette from "../../utils/palette"

export default class Screen extends Component {

  render(){
    return(
      <View style={ this.props.darkMode ? styles.containerDark : styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.light,
    flex: 1,
    paddingTop: 20,
  },

  containerDark: {
    backgroundColor: palette.dark,
    flex: 1,
    paddingTop: 20,
  }

})
