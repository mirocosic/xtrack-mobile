import React from "react"
import { View, TouchableOpacity } from "react-native"
import FontAwesome, { Icons } from "react-native-fontawesome"
import propTypes from "prop-types"
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

const CategoryIcons = props => (
  <View style={styles.container}>
    <View style={styles.iconWrap}>
      { regular.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => props.select(getKeyByValue(Icons, value))}>
          <FontAwesome
            type="FontAwesome5FreeRegular"
            style={[styles.icon, Icons[props.selected] === value && styles.selected]}>{value}
          </FontAwesome>
        </TouchableOpacity>
      ))}

      { solid.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => { props.select(getKeyByValue(Icons, value)) }}>
          <FontAwesome
            type="FontAwesome5FreeSolid"
            style={[styles.icon, Icons[props.selected] === value && styles.selected]}>{value}
          </FontAwesome>
        </TouchableOpacity>
      ))}

    </View>
  </View>
)

CategoryIcons.defaultProps = {
  selected: "car",
}

CategoryIcons.propTypes = {
  select: propTypes.any
}

export default CategoryIcons
