import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";

import { Title } from "../typography";
import __ from "../../utils/translations"

import styles from "./styles"

export default class Header extends Component {

  render(){
    return(
      <View style={[styles.container, this.props.style]}>
        { this.props.backBtn &&
          <TouchableOpacity style={styles.backBtn} onPress={this.props.backBtnPress}>
            <Title style={{color: "white"}}>{"<"}</Title>
          </TouchableOpacity>
        }
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'center'}}>
          {this.props.icon}
          <Title style={{alignSelf: "center", color: "white"}}>{__(this.props.title)}</Title>
        </View>

        {this.props.children}
      </View>
    )
  }
}
