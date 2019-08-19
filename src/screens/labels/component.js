import React, { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import { Screen, Header, Footer } from "../../components"
import { Copy } from "../../components/typography"

import styles from "./styles"

const colors = ["#FF5722", "#2196F3", "#0097A7", "#673AB7", "#3F51B5"];

const Labels = (props) => {

  const { navigation, labels, remove, darkMode, select } = props

  return (
    <Screen>
      <Header title="Labels" />
      <ScrollView>
        <View>
          {labels.map(label => (
            <TouchableOpacity
              key={label.id}
              onPress={() => { select(label) }}
            >
              <View key={label.id} style={[styles.wrap, darkMode && styles.wrapDark]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 20, height: 20, backgroundColor: label.color, marginRight: 10 }} />
                  <Copy>{label.name}</Copy>
                </View>

                <TouchableOpacity style={styles.delete} onPress={() => remove(label.id)}>
                  <Text>`-`</Text>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>

          ))}
        </View>
      </ScrollView>
      <Footer>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("AccountEdit")}>
            <Copy style={{ color: "teal" }}>Add new label</Copy>
          </TouchableOpacity>
        </View>
      </Footer>

    </Screen>
  )
}

export default withNavigation(Labels);
