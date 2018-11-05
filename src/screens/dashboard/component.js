import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Transaction from "../../components/transaction"
import { Copy, Title } from "../../components/typography"
import translate from "../../utils/translations"

class Dashboard extends Component {

  render(){
    return(
      <Screen>
        <ScrollView>
          <Title style={{alignSelf: "center"}}>{translate("Dashboard", "hrv")}</Title>

          <View>
            <Copy>Total: {this.props.total}</Copy>
          </View>

          <View>

            {this.props.entries.map((value)=>(
            <View>
              <Transaction key={value.id} transaction={value} /></View>
            ))}
          </View>

        </ScrollView>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("EntryForm")}
          style={styles.addButton}>
          <Copy style={{fontSize: 40, color: "#f0f0f0"}}>+</Copy>
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default withNavigation (Dashboard);

const styles = StyleSheet.create({

  addButton: {
    position: "absolute",
    bottom: 20,
    marginRight: 20,
    alignSelf: "flex-end",
    right: 0,
    alignItems:"center",
    justifyContent: "center",
    width: 60,
    height: 60,
    padding: 0,
    borderRadius: 30,
    backgroundColor: "green"
  }
})
