import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Title } from "../typography";
import __ from "../../utils/translations"


export default class Header extends Component {

  render(){
    return(
      <View style={styles.container}>
        { this.props.backBtn &&
          <TouchableOpacity style={styles.backBtn} onPress={this.props.backBtnPress}>
            <Title style={{color: "white"}}>{"<"}</Title>
          </TouchableOpacity>
        }
        <Title style={{alignSelf: "center", color: "white"}}>{__(this.props.title)}</Title>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "teal"
  },

  backBtn: {
    color: "white",
    position: "absolute",
    left: 20
  }
})
