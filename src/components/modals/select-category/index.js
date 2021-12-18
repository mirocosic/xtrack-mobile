import React, { Component } from "react"
import { View, TouchableOpacity, Keyboard, ScrollView } from "react-native"
import { Modalize } from "react-native-modalize"
import { get } from "lodash"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Icon from "../../icon"
import { Copy } from "../../typography"
import { useDarkTheme } from "../../../utils/ui-utils"
import styles from "./styles"


export default React.forwardRef((props, ref) => {
  const { categories, onSelect, transactions, navigation } = props
  const insets = useSafeAreaInsets()

  const categoriesWithCount = categories.map(cat => ({
    ...cat,
    count: transactions.filter(t => get(t, "categoryId") === cat.id).length,
  }))

  return (
    <Modalize
      onOpen={() => Keyboard.dismiss()}
      adjustToContentHeight
      modalStyle={[styles.modal, useDarkTheme() && styles.modalDark]}
      ref={ref}>
      <ScrollView 
        style={{ minHeight: 200, maxHeight: 400, padding: 10 }}
        contentContainerStyle={{paddingBottom: insets.bottom}}>

        {categoriesWithCount
          .sort((a, b) => b.count - a.count)
          .map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => onSelect(cat)}>
              <View style={{ flexDirection: "row", alignItems: "center", margin: 5, flex:1 }}>
                <Icon type={get(cat, "icon", "")} textStyle={{ color: cat.color || "blue" }} style={{ marginRight: 10 }} />
                <Copy style={{flex: 1}}>{cat.name}</Copy>
              </View>
            </TouchableOpacity>
          ))}

        <TouchableOpacity
          style={{ position: "absolute", right: 10 }}
          onPress={() => ref.current.close()}>
          <Icon type="times" textStyle={{ color: "teal" }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.inline, { justifyContent: "flex-start", paddingLeft: 5 }]}
          onPress={() => navigation.navigate("CategoryEdit", {})}>
          <Icon type="plus" textStyle={{ color: "teal" }} />
          <Copy style={{ fontSize: 14 }}>Add new category</Copy>
        </TouchableOpacity>

      </ScrollView>
    </Modalize>
  ) 

})