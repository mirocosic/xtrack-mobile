import React from "react"
import { View, TouchableOpacity } from "react-native"
import FontAwesome, { Icons } from "react-native-fontawesome"

import styles from "./styles"

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const regular = [
  Icons.addressCard,
  Icons.creditCard,
  Icons.bell,
  Icons.square,
]

const solid = [
  Icons.archive,
  Icons.creditCard,
  Icons.dollarSign,
  Icons.bus,
  Icons.car,
  Icons.cocktail,
  Icons.home,
  Icons.om,
  Icons.plane,
  Icons.poo,
  Icons.shoppingBasket,
  Icons.smoking,
  Icons.utensils,
  Icons.filter,
]

const CategoryIcons = () => (
  <View style={styles.container}>
    <View style={styles.iconWrap}>
      { regular.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => {this.props.select(getKeyByValue(Icons, value))}}
        >
          <FontAwesome type="FontAwesome5FreeRegular" style={[styles.icon, Icons[this.props.selected] === value && styles.selected]}>{value}</FontAwesome>
        </TouchableOpacity>
      ))}

      { solid.map((value)=>{
        return(
          <TouchableOpacity
            key={value}
            onPress={()=>{this.props.select(getKeyByValue(Icons, value))}}>
          <FontAwesome type="FontAwesome5FreeSolid" style={[styles.icon, Icons[this.props.selected] === value && styles.selected]}>{value}</FontAwesome>
          </TouchableOpacity>
        )
      })}

    </View>
  </View>
)

export default CategoryIcons
