import React, { Component } from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import Modalize from "react-native-modalize"
import { DarkModeContext } from "react-native-dark-mode"

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy } from "../../components/typography"

import styles from "./styles"

const colors = ["#FF5722", "#F39A27", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class LabelEdit extends Component {

  static contextType = DarkModeContext

  state = { label: this.props.route.params.label || {} }

  input = React.createRef()

  colorModal = React.createRef()

  handleSave = (label) => {
    const { edit, add, navigation } = this.props
    label.id ? edit(label) : add(label)
    navigation.goBack()
  }

  render() {
    const darkMode = this.context === "dark"
    const { label } = this.state

    return (
      <Screen>
        <Header title={label.name} backBtn />

        <View style={{ padding: 20 }}>

          <View style={styles.inputContainer}>
            <Copy>Name</Copy>
            <TextInput
              ref={this.input}
              style={[styles.input, darkMode && styles.inputDark]}
              onChangeText={text => this.setState({ label: { ...label, name: text } })}
              returnKeyType="done"
              onSubmitEditing={() => this.handleSave(label)}
              placeholder="new label"
              value={label.name}
            />

          </View>

          <View style={[styles.inlineBetween, { margin: 10 }]}>
            <Copy>Color</Copy>
            <TouchableOpacity onPress={() => this.colorModal.current.open()}>
              <View style={{ width: 40, height: 40, backgroundColor: label.color, borderRadius: 5 }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.add}
            onPress={() => this.handleSave(label)}
          >
            <Copy style={{ color: "white" }}>Save</Copy>
          </TouchableOpacity>

        </View>

        <Modalize
          adjustToContentHeight
          modalStyle={[styles.modal, darkMode && styles.modalDark]}
          ref={this.colorModal}>
          <View style={styles.colorPicker}>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBox, label.color === color && styles.selectedColor, { backgroundColor: color }]}
                onPress={() => this.setState({ label: { ...label, color } })}
              />
            ))}
          </View>
        </Modalize>
      </Screen>
    )
  }
}

export default LabelEdit
