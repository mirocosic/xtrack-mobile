import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { withNavigation } from "react-navigation";

import Screen from "../../components/screen"
import Header from "../../components/header"
import CategoryIcons from "../../components/category-icons"
import Icon from "../../components/icon"
import { Copy } from "../../components/typography"
import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

class CategoryEdit extends Component {

  state = {
    category: this.props.selectedCategory,
  }

  render() {

    const { category } = this.state
    return (
      <Screen>
        <Header icon={<Icon type={category.icon} style={{backgroundColor: category.color}} />}
        title={category.name} backBtn={true} backBtnPress={()=>this.props.navigation.goBack()}/>
        <ScrollView>
          <View>
          {
            // <View style={styles.typeButtonsWrap}>
            //   <TouchableOpacity onPress={()=>this.setState({type: "expense"})}
            //     style={[styles.typeButton, this.state.type === "expense" && styles.btnSelected, this.props.darkMode && styles.btnDark]}>
            //     <Copy style={this.state.type === "expense" && styles.copySelected}>{__("Expense")}</Copy>
            //   </TouchableOpacity>
            //
            //   <TouchableOpacity onPress={()=>this.setState({type: "income"})}
            //     style={[styles.typeButton, this.state.type === "income" && styles.btnSelected, this.props.darkMode && styles.btnDark]}>
            //       <Copy style={this.state.type === "income" && styles.copySelected}>{__("Income")}</Copy>
            //   </TouchableOpacity>
            // </View>
}
            <View style={styles.colorPicker}>
              { colors.map((color)=>{
                return(
                  <TouchableOpacity
                    key={color}
                    style={[styles.colorBox, this.state.category.color === color && styles.selectedColor, {backgroundColor: color}]}
                    onPress={()=>this.setState({category: {
                      ...this.state.category,
                      ...{color}
                    }})}>

                  </TouchableOpacity>
                )
              })}
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={[styles.input, this.props.darkMode && styles.inputDark]}
                onChangeText={(text)=>this.setState({
                  category: {
                    ...this.state.category,
                    ...{name: text}
                  }})}
                returnKeyType="done"
                placeholder="category name"
                value={category.name}
                />
              <TouchableOpacity style={styles.add}
                onPress={()=>{

                  this.props.edit(category)
                  this.props.navigation.goBack()
                }}
                >
                <Copy style={{color: "white"}}>Save</Copy>
              </TouchableOpacity>
            </View>

            <CategoryIcons selected={category.icon} select={(icon)=>{this.setState({
              category: {
                ...this.state.category,
                ...{icon}
              }
            })}}/>

          </View>

        </ScrollView>
      </Screen>
    )
  }
}

export default withNavigation(CategoryEdit)
