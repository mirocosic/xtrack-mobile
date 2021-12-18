import React, { Component } from "react"
import { View, TouchableOpacity, Keyboard, ScrollView } from "react-native"
import { Modalize } from "react-native-modalize"
import { get } from "lodash"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Label } from "../../../components"
import Icon from "../../icon"
import { Copy } from "../../typography"
import { useDarkTheme } from "../../../utils/ui-utils"
import styles from "./styles"


export default React.forwardRef((props, ref) => {
  const { labels, onSelect, transaction, navigation } = props
  const insets = useSafeAreaInsets()

  return (
    <Modalize
      onOpen={() => Keyboard.dismiss()}
      adjustToContentHeight
      modalStyle={[styles.modal, useDarkTheme() && styles.modalDark]}
      ref={ref}>
      <ScrollView 
        style={{ minHeight: 200, maxHeight: 400, padding: 10 }}
        contentContainerStyle={{paddingBottom: insets.bottom}}>

        {labels.map(label => (
          <TouchableOpacity
            key={label.id}
            onPress={() => onSelect(label)}>
            <Label key={label.uuid} label={label} style={{ width: 70 }} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{ position: "absolute", right: 10 }}
          onPress={() => ref.current.close()}>
          <Icon type="times" textStyle={{ color: "teal" }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inline, { justifyContent: "flex-start", paddingLeft: 5 }]}
          onPress={() => navigation.navigate("LabelEdit", {})}>
          <Icon type="plus" textStyle={{ color: "teal" }} />
          <Copy style={{ fontSize: 14 }}>Add new tag</Copy>
        </TouchableOpacity>
      </ScrollView>
    </Modalize>
  ) 

})