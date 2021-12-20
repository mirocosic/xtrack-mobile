import React from "react"
import { View, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Screen, Header, Copy } from "../../components"
import Category from "../../components/category"
import { isAndroid } from "../../utils/os-utils"
import styles from "./styles"

const Categories = ({ categories, navigation, selectCategory }) => {

  const insets = useSafeAreaInsets()

  return (

  <Screen>
    <Header title="Categories" backBtn withInsets />
    <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 50}}>
      <View>
        {categories
          .sort((a, b) => a.name < b.name)
          .map(cat => (
            <Category
              key={cat.id}
              data={cat}
              onPress={() => { selectCategory(cat); navigation.goBack() }}
              navigation={navigation}
            />
          ))
          .reverse()
        }
      </View>
    </ScrollView>

    <View style={[isAndroid && { paddingBottom: 10 }, { width: "80%", left: "10%", bottom: insets.bottom, position: "absolute" }]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CategoryEdit", { id: false })}
        style={styles.addWrap}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#2292f4", "#2031f4"]}
          style={[{ height: 50, width: 200 }, styles.add]}>
          <Copy style={{ color: "white" }}>Add new category</Copy>
        </LinearGradient>
      </TouchableOpacity>
    </View>

  </Screen>

)}

export default Categories
