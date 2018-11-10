import React, { Component } from "react"
import { Animated, Easing, TouchableOpacity } from "react-native"

import { Title } from "../typography"

export default class SelectBox extends Component {

  state = {
    vertical: new Animated.Value(0),
    scaleX: new Animated.Value(120),
    scaleY: new Animated.Value(30),
    move: new Animated.Value(0)
  }

  handleSelect = (type) => {
    let vertical = 0;
    let x = 120;
    let y = 30;
    let move = 0;

    if (type === "income"){
      vertical = -87
    } else if (type === "expense") {
      vertical = -20
    } else if (type === "transfer") {
      vertical = -155
    }

    if (this.state.closed) {
      x = 120;
      y = 200;
      move = 100;
      vertical = 0;
    }

    Animated.parallel([
      Animated.timing(                   // Animate over time
        this.state.scaleX,            // The animated value to drive
        {
          toValue: x,                   // Animate to opacity: 1 (opaque)
          duration: 300,
          easing: Easing.quad,              // Make it take a while
        }
      ),
      Animated.timing(                   // Animate over time
        this.state.scaleY,            // The animated value to drive
        {
          toValue: y,                   // Animate to opacity: 1 (opaque)
          duration: 300,
          easing: Easing.quad,
        }
      ),
      Animated.timing(                  // Animate over time
        this.state.move,            // The animated value to drive
        {
          toValue: move,                   // Animate to opacity: 1 (opaque)
          duration: 300,              // Make it take a while
        }
      ),
      Animated.timing(                  // Animate over time
        this.state.vertical,            // The animated value to drive
        {
          toValue: vertical,                   // Animate to opacity: 1 (opaque)
          duration: 300,              // Make it take a while
        }
      )
    ]).start()

    this.setState({
      closed: !this.state.closed
    })

    this.props.onPress && this.props.onPress(type);
  }

  componentDidMount = () => {
    if (this.props.selected === "income"){
      vertical = -87
    } else if (this.props.selected === "expense") {
      vertical = -20
    } else if (this.props.selected === "transfer") {
      vertical = -155
    }

    Animated.sequence([
        Animated.delay(200),
        Animated.timing(                  // Animate over time
          this.state.vertical,            // The animated value to drive
          {
            toValue: vertical,                   // Animate to opacity: 1 (opaque)
            duration: 500,              // Make it take a while
          }
        )
    ]).start()

  }

  render(){
    return(
      <TouchableOpacity
        style={{position: "absolute", zIndex: 100, left: 150, top: 10}}
        onPress={()=>this.handleClick()}>
        <Animated.View
          style={{
            overflow: "hidden",
            borderRadius: 25,
            //marginLeft: this.state.move,
            //marginTop: this.state.move,
            width: this.state.scaleX, height: this.state.scaleY, backgroundColor: "white"}}>

            <Animated.View style={{
                alignItems: "center",

                marginTop: this.state.vertical}}>

              <TouchableOpacity
                  style={{width: "100%", alignItems: "center", backgroundColor: "white"}}
                onPress={()=>{this.handleSelect("expense")}}>
                <Title style={{color: "red", lineHeight: 50}}>expense</Title>
              </TouchableOpacity>

              <TouchableOpacity
                style={{width: "100%", alignItems: "center", backgroundColor: "white"}}
                onPress={()=>{this.handleSelect("income")}}>
                <Title style={{color: "green", lineHeight: 50}}>income</Title>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: "100%", alignItems: "center", backgroundColor: "white"}}
                onPress={()=>{this.handleSelect("transfer")}}>
                <Title style={{color: "blue", lineHeight: 50}}>transfer</Title>
              </TouchableOpacity>
            </Animated.View>

        </Animated.View>
      </TouchableOpacity>
    )
  }
}
