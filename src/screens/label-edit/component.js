import React, { Component } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy } from "../../components/typography"

import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class LabelEdit extends Component {

  state = {
    label: this.props.navigation.state.params.label || {}
  }

  render() {
    const { add, edit, navigation, darkMode } = this.props
    const { label } = this.state

    return (
      <Screen>
        <Header title={label.name} backBtn />
        <ScrollView>
          <View style={{ padding: 20 }}>

            <View style={styles.colorPicker}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorBox, label.color === color && styles.selectedColor, { backgroundColor: color }]}
                  onPress={() => this.setState({ label: {...label, color }})}
                />
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => this.setState({ label: { ...label, name: text } })}
                placeholder="new label"
                value={label.name}
              />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  label.id ? edit(label) : add(label)
                  navigation.goBack()
                }}
              >
                <Copy style={{ color: "white" }}>Save</Copy>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation(LabelEdit);
