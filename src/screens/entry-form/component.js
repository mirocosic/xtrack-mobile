import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

import { withNavigation } from "react-navigation";

class EntryForm extends Component<Props> {

  state = {
    amount: 0,
    date: "",
    note: ""
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Enter your expense now!</Text>
        <TextInput
            onChangeText={(value) => this.setState({amount: value})}
            style={styles.textInput}
            placeholder="amount"
            keyboardType="numbers-and-punctuation"
        />
        <TextInput
            onChangeText={(value) => this.setState({date: value})}
            style={styles.textInput}
            placeholder="date"
        />
        <TextInput
            onChangeText={(value) => this.setState({note: value})}
            style={styles.textInput}
            placeholder="note"
        />
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Categories")}>
          <Text style={styles.textInput}>{this.props.selectedCategory.name}</Text>
        </TouchableOpacity>

        <Button title="Save" onPress={()=>this.props.addNew(
          { amount: this.state.amount,
            note: this.state.note,
            category: this.props.selectCategory
          }
        )}/>

        <Button title="Dashboard" onPress={()=>this.props.navigation.navigate('Dashboard')}/>
      </View>
    );
  }
}

export default withNavigation(EntryForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  textInput: {
    fontSize: 16,
    width: 200,
    borderWidth: 1,
    padding: 10,
    margin: 10
  }
});
