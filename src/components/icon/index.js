import React, { Component } from "react"
import { View, Image } from "react-native"

//import icons from "../../../assets/icons"

import money from "../../../assets/icons/money.png"
import category from "../../../assets/icons/default.png"

const icons = {
  money,
  category
}

export default class Icon extends Component {

  render(){
    return(
      <View style={[{padding: 10, backgroundColor: "blue", borderRadius: 20}, this.props.style]}>
        <Image
          source={icons[this.props.icon] || icons.category}
          style={{width: 20, height: 20, tintColor: "white"}}/>
      </View>
    )
  }
}
