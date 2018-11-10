import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import { Copy, Title } from "../../components/typography"

import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class Labels extends Component {

  state = {
    name: "",
    color: ""
  }


  render(){
    return(
      <Screen>
        <Header title="Labels" backBtn={true} backBtnPress={()=>this.props.navigation.goBack()}/>
        <ScrollView>
          <View>

            <View style={styles.colorPicker}>
              { colors.map((color)=>{
                return(
                  <TouchableOpacity
                    style={[styles.colorBox, this.state.color === color && styles.selectedColor, {backgroundColor: color}]}
                    onPress={()=>this.setState({color})}>

                  </TouchableOpacity>
                )
              })}
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={(text)=>this.setState({name: text})}
                placeholder="new label"
                value={this.state.name}
                />
              <TouchableOpacity style={styles.add}
                onPress={()=>{
                  this.setState({name: ""})
                  this.props.add({name: this.state.name, color: this.state.color})}}
                >
                <Copy style={{color: "white"}}>Add</Copy>
              </TouchableOpacity>
            </View>

            {this.props.labels.map((label)=>(
              <TouchableOpacity key={label.id}
                onPress={()=>{this.props.select(label); this.props.navigation.goBack()}}>

                <View key={label.id} style={[styles.wrap, this.props.darkMode && styles.wrapDark]}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: 20, height: 20, backgroundColor: label.color, marginRight: 10}}></View>
                    <Copy>{label.name}</Copy>
                  </View>

                  <TouchableOpacity style={styles.delete} onPress={()=>this.props.delete(label.id)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>

            ))}
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation (Labels);
