import React, { Component } from "react";
import { View,TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Modalize from "react-native-modalize"
import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy } from "../../components/typography"

import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class LabelEdit extends Component {

  state = { label: this.props.navigation.state.params.label || {} }

  input = React.createRef()

  colorModal = React.createRef()

  handleSave = (label) => {
    const { edit, add, navigation } = this.props
    label.id ? edit(label) : add(label)
    navigation.goBack()
  }

  render() {
    const { add, edit, navigation, darkMode } = this.props
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
          modalHeight={300}
          ref={this.colorModal}
        >
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

export default withNavigation(LabelEdit);
