import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from "./navigators/app-navigator";
import BottomBarNavigator from './navigators/bottom-bar-navigator';

export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
    );
  }
}

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
