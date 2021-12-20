import React, { useRef, useState } from "react"
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { Modalize } from "react-native-modalize"
import LinearGradient from "react-native-linear-gradient"
import { BorderlessButton } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy } from "../../components/typography"
import { Icon } from "../../components"
import styles from "./styles"
import { isAndroid } from "../../utils/os-utils"
import palette from "../../utils/palette"
import { useDarkTheme } from "../../utils/ui-utils"

const colors = ["#FF5722", "#F39A27", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];
const defaultLabel = { color: "#0097A7" }

export default ({navigation, route: {params}, edit, add, deleteLabel}) => {

  const inputRef = useRef(null)
  const colorModal = useRef(null)
  const darkMode = useDarkTheme()
  const insets = useSafeAreaInsets()
  const [label, setLabel] = useState(params.label || defaultLabel)

  const handleSave = (label) => {
    label.id ? edit(label) : add(label)
    navigation.goBack()
  }

  const handleDelete = (label) => {
    deleteLabel(label.id)
    navigation.goBack()
  }

    return (
      <Screen>
        <Header title={label.name} backBtn={isAndroid} />

        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, flex: 1, justifyContent: "space-between" }}>

          <View>
            <View style={styles.inputContainer}>
              <Copy>Name</Copy>
              <TextInput
                ref={inputRef}
                autoFocus={!label.id}
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => setLabel({ ...label, name: text })}
                placeholder="tag name"
                placeholderTextColor="gray"
                value={label.name}/>
            </View>

            <View style={[styles.inlineBetween, { margin: 10 }]}>
              <Copy>Color</Copy>
              <TouchableOpacity onPress={() => colorModal.current.open()}>
                <View style={{ width: 40, height: 40, backgroundColor: label.color, borderRadius: 5 }} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: insets.bottom}}>
            <BorderlessButton onPress={() => {handleDelete(label)}}>
              <Icon type="trash-alt" textStyle={{color: darkMode ? palette.light : palette.dark}} style={{borderColor: darkMode ? palette.light : palette.dark, borderWidth: 1, borderRadius: 10}}/>
            </BorderlessButton>
            <TouchableOpacity onPress={() => handleSave(label)} style={styles.addWrap}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#2292f4", "#2031f4"]} style={[styles.add]}>
                <Copy style={{ color: "white" }}>Save</Copy>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </ScrollView>

        <Modalize
          adjustToContentHeight
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          ref={colorModal}>
          <View style={styles.colorPicker}>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBox, label.color === color && styles.selectedColor, { backgroundColor: color }]}
                onPress={() => {
                  setLabel({ ...label, color })
                  colorModal.current.close()
                }}
              />
            ))}
          </View>
        </Modalize>

      </Screen>
    )
}