import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"

class Dashboard extends Component {

  render(){
    return(
      <Screen>
        <Text style={{color: "black", fontSize: 24}}>Dashboard</Text>
        <View>
          <Text>Entries</Text>
          {this.props.entries.map((entry)=>(
            <View key={entry.id}>
              <Text>{entry.amount}</Text>
            </View>
          ))}
        </View>
        <Button title="New entry" onPress={()=>this.props.navigation.navigate("EntryForm")}/>
      </Screen>
    )
  }
}

export default withNavigation (Dashboard);
