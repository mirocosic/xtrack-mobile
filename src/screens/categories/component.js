import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"

class Categories extends Component {

  render(){
    return(
      <Screen>
        <Text style={{color: "black", fontSize: 24}}>Categories</Text>
        <View>
          <Text>Categories</Text>
          {this.props.categories.map((cat)=>(
            <TouchableOpacity key={cat.id}
              onPress={()=>{this.props.selectCategory(cat); this.props.navigation.goBack()}}>
              <View key={cat.id} style={styles.categoryWrap}>
                <Text>{cat.name}</Text>
              </View>
            </TouchableOpacity>

          ))}
        </View>
        <Button title="Select" onPress={()=>this.props.navigation.navigate("EntryForm")}/>
      </Screen>
    )
  }
}

export default withNavigation (Categories);

const styles = StyleSheet.create({
  categoryWrap: {
    padding: 20,
    borderWidth: 1
  }
})
