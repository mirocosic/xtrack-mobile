import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"

class Categories extends Component {

  state = {
    categoryName: ""
  }

  render(){
    return(
      <Screen>
        <ScrollView>
          <Title style={{alignSelf: "center"}}>Categories</Title>
          <View>

            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={(text)=>this.setState({categoryName: text})}
                placeholder="new category"
                value={this.state.categoryName}
                />
              <TouchableOpacity style={styles.add}
                onPress={()=>{
                  this.setState({categoryName: ""})
                  this.props.add(this.state.categoryName)}}
                >
                <Copy style={{color: "white"}}>Add</Copy>
              </TouchableOpacity>
            </View>

            {this.props.categories.map((cat)=>(
              <TouchableOpacity key={cat.id}

                onPress={()=>{this.props.selectCategory(cat); this.props.navigation.goBack()}}>
                <View key={cat.id} style={[styles.categoryWrap, this.props.darkMode && styles.catWrapDark]}>
                  <Copy>{cat.name}</Copy>
                  <TouchableOpacity style={styles.delete} onPress={()=>this.props.delete(cat.id)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

            )).reverse()}
          </View>
          <Button title="Select" onPress={()=>this.props.navigation.navigate("EntryForm")}/>
        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation (Categories);

const styles = StyleSheet.create({
  categoryWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    margin:10
  },

  catWrapDark: {
    borderColor: "white"
  },

  inputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  input: {
    color: "black",
    fontSize: 20,
    padding: 20,
    margin: 20,
    width: 200,
    borderBottomWidth: 1
  },

  inputDark: {
    color: "white",
    borderColor: "white"
  },

  add: {
    width: 50,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  },

  delete: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  }
})
