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
    name: "",
    color: "",
  }

  render() {
    return (
      <Screen>
        <Header title="Labels" backBtn />
        <ScrollView>
          <View style={{ padding: 20 }}>

            <View style={styles.colorPicker}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorBox, this.state.color === color && styles.selectedColor, { backgroundColor: color }]}
                  onPress={() => this.setState({ color })}
                />
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={text => this.setState({ name: text })}
                placeholder="new label"
                value={this.state.name}
              />
              <TouchableOpacity
                style={styles.add}
                onPress={() => {
                  this.setState({ name: "" })
                  this.props.add({ name: this.state.name, color: this.state.color })}}
              >
                <Copy style={{ color: "white" }}>Add</Copy>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation(LabelEdit);
