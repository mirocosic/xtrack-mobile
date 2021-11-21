import React, { Component } from "react"
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { Modalize } from "react-native-modalize"
import { DarkModeContext } from "react-native-dark-mode"
import LinearGradient from "react-native-linear-gradient"
import { BorderlessButton } from "react-native-gesture-handler"

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy } from "../../components/typography"
import { Icon } from "../../components"
import styles from "./styles"
import { isAndroid } from "../../utils/os-utils"
import palette from "../../utils/palette"

const colors = ["#FF5722", "#F39A27", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];
const defaultLabel = { color: "#0097A7" }

class LabelEdit extends Component {

  static contextType = DarkModeContext

  state = { label: this.props.route.params.label || defaultLabel }

  input = React.createRef()

  colorModal = React.createRef()

  handleSave = (label) => {
    const { edit, add, navigation } = this.props
    label.id ? edit(label) : add(label)
    navigation.goBack()
  }

  handleDelete = (label) => {
    const { navigation } = this.props
    this.props.delete(label.id)
    navigation.goBack()
  }


  render() {
    const { theme } = this.props
    const darkMode =  theme === "system" ? this.context === "dark" : theme === "dark"
    const { label } = this.state
    

    return (
      <Screen>
        <Header title={label.name} backBtn={isAndroid} />

        <ScrollView contentContainerStyle={{ padding: 20, flex: 1, justifyContent: "space-between" }}>

          <View>
            <View style={styles.inputContainer}>
              <Copy>Name</Copy>
              <TextInput
                ref={this.input}
                autoFocus={!label.id}
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => this.setState({ label: { ...label, name: text } })}
                placeholder="tag name"
                placeholderTextColor="gray"
                value={label.name}/>
            </View>

            <View style={[styles.inlineBetween, { margin: 10 }]}>
              <Copy>Color</Copy>
              <TouchableOpacity onPress={() => this.colorModal.current.open()}>
                <View style={{ width: 40, height: 40, backgroundColor: label.color, borderRadius: 5 }} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <BorderlessButton onPress={() => {this.handleDelete(label)}}>
              <Icon type="trash-alt" textStyle={{color: darkMode ? palette.light : palette.dark}} />
            </BorderlessButton>
            <TouchableOpacity onPress={() => this.handleSave(label)} style={styles.addWrap}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#2292f4", "#2031f4"]} style={[styles.add]}>
                <Copy style={{ color: "white" }}>Save</Copy>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </ScrollView>

        <Modalize
          adjustToContentHeight
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          ref={this.colorModal}>
          <View style={styles.colorPicker}>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBox, label.color === color && styles.selectedColor, { backgroundColor: color }]}
                onPress={() => {
                  this.setState({ label: { ...label, color } })
                  this.colorModal.current.close()
                }}
              />
            ))}
          </View>
        </Modalize>

      </Screen>
    )
  }
}

export default LabelEdit
