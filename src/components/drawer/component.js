import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import RNDrawer from "react-native-drawer"

import styles from "./styles"

export default class Drawer extends Component {

  renderDrawerContent = (content) => {
    return (
      <View style={{flex: 1, backgroundColor: "white"}}>
        <Text>Filters</Text>
        <TouchableOpacity onPress={()=>this.props.closeDrawer()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { drawerOpen, drawerIsCanceled, drawerContent, applyFilters, applyMessageFilter, closeDrawer } = this.props;
    return (
      <RNDrawer
        ref={ref => this._drawer = ref}
        open={drawerOpen}
        side={ this.props.side || 'left'}
        tapToClose={true}
        onClose={() => {
          //drawerIsCanceled ? this.cancelAction(drawerContent) : this.applyAction(drawerContent)
          closeDrawer();
        }}
        openDrawerOffset={50}
        content={this.renderDrawerContent(drawerContent)}
        type="overlay"
        tweenDuration={500}
        tweenEasing="easeInOutQuart"
        tweenHandler={ratio => ({ mainOverlay: { opacity: ratio * 0.8 } })}
        styles={{ mainOverlay: { backgroundColor: "rgba(3,61,89,1)", opacity: 0 } }}
      >
        {this.props.children}
      </RNDrawer>
    )
  }
}
