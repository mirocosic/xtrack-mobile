import React from "react"
import { View, TouchableOpacity } from "react-native"
import FontAwesome, { Icons } from "react-native-fontawesome"
import propTypes from "prop-types"
import styles from "./styles"

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

const regular = [Icons.addressCard, Icons.creditCard, Icons.bell, Icons.square, Icons.moneyBillAlt]

const solid = [
  Icons.archive,

  Icons.creditCard,
  Icons.dollarSign,
  Icons.euroSign,
  Icons.moneyBill,
  Icons.moneyBillAlt,
  Icons.bus,
  Icons.car,
  Icons.taxi,
  Icons.motorcycle,
  Icons.bicycle,
  Icons.gasPump,

  Icons.home,
  Icons.om,
  Icons.plane,
  Icons.poo,
  Icons.shoppingBasket,

  Icons.smoking,
  Icons.utensils,
  Icons.fish,
  Icons.coffee,
  Icons.beer,
  Icons.cocktail,

  Icons.cannabis,
  Icons.cog,
  Icons.laptop,
  Icons.envelope,
  Icons.couch,

  Icons.checkSquare,
  Icons.squareRootAlt,

  Icons.filter,
  Icons.snowflake,
  Icons.paw,
  Icons.cat,

  Icons.male,
  Icons.female,
]

const CategoryIcons = props => (
  <View style={styles.container}>
    <View style={styles.iconWrap}>
      {regular.map(value => (
        <TouchableOpacity key={value} onPress={() => props.select(getKeyByValue(Icons, value))}>
          <FontAwesome type="FontAwesome5FreeRegular" style={[styles.icon, Icons[props.selected] === value && styles.selected]}>
            {value}
          </FontAwesome>
        </TouchableOpacity>
      ))}

      {solid.map(value => (
        <TouchableOpacity
          key={`${value}solid`}
          onPress={() => {
            props.select(getKeyByValue(Icons, value))
          }}>
          <FontAwesome type="FontAwesome5FreeSolid" style={[styles.icon, Icons[props.selected] === value && styles.selected]}>
            {value}
          </FontAwesome>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

CategoryIcons.defaultProps = { selected: "car" }

CategoryIcons.propTypes = {
  select: propTypes.func.isRequired,
  selected: propTypes.string,
}

export default CategoryIcons
