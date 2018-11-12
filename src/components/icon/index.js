import React, { Component } from "react"
import { View, Image } from "react-native"

//import icons from "../../../assets/icons"
import FontAwesome, { Icons } from "react-native-fontawesome"

import money from "../../../assets/icons/money.png"
import category from "../../../assets/icons/default.png"

const icons = {
  money,
  category
}

export default class Icon extends Component {

  render(){
    return(
      <View style={[{width:40, height:40, alignItems: "center", justifyContent: "center", backgroundColor: "blue", borderRadius: 20}, this.props.style]}>
        { this.props.type ?
          <FontAwesome style={[{fontSize: 16, color:"white"}, this.props.textStyle]}
            type="FontAwesome5FreeSolid">{Icons[this.props.type]}</FontAwesome>
        :
        <Image
          source={icons[this.props.icon] || icons.category}
          style={{width: 20, height: 20, tintColor: "white"}}/>
       }


      </View>
    )
  }
}
