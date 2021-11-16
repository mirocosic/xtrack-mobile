import React from "react"
import { View, TouchableOpacity } from "react-native"
import { DrawerContentScrollView } from "@react-navigation/drawer"

import { PrimaryButton } from "../buttons"
import Icon from "../icon"
import { Title, Copy } from "../typography"
import palette from "../../utils/palette"
import styles from "./styles"
import { useDarkTheme } from "../../utils/ui-utils"

export default (props) => {
    const {
      categories,
      accounts,
      changeAccountFilter,
      changeCategoryFilter,
      resetFilters,
      applyLabelFilter,
      removeLabelFilter,
      navigation,
      accountFilter,
      categoryFilter,
      labels,
      appliedLabelsFilter,
    } = props

    return (
      <DrawerContentScrollView style={{paddingHorizontal: 20, backgroundColor: useDarkTheme() ? palette.dark : palette.light }}>
        <View style={styles.contentHeader}>
          <Title>Filters</Title>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Icon type="times" style={{ backgroundColor: useDarkTheme() ? palette.dark : "white" }} textStyle={{ color: useDarkTheme() ? "white" : "black" }} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingLeft: 5 }}>
          <Copy style={{ paddingTop: 10 }}>Account</Copy>
          <View style={{ paddingTop: 10, paddingLeft: 10 }}>
            {accounts.map(acc => (
              <TouchableOpacity
                key={acc.id}
                style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
                onPress={() => (accountFilter.id === acc.id ? changeAccountFilter(false) : changeAccountFilter(acc))}>
                <View style={{ borderRadius: 20, borderWidth: 2, borderColor: "teal", marginRight: 5 }}>
                  {accountFilter.id === acc.id ? (
                    <Icon type="check" style={{ width: 22, height: 22 }} textStyle={{ color: "teal", fontSize: 14 }} />
                  ) : (
                    <Icon style={{ width: 22, height: 22 }} textStyle={{ color: "teal", fontSize: 14 }} />
                  )}
                </View>
                <Copy style={{ fontSize: 14 }}>{acc.name}</Copy>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
            <Copy>Category</Copy>
            <View style={{ paddingTop: 10, paddingLeft: 10 }}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => (categoryFilter.id === cat.id ? changeCategoryFilter(false) : changeCategoryFilter(cat))}
                  style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
                  <View style={{ borderRadius: 20, borderWidth: 2, borderColor: "teal", marginRight: 5 }}>
                    {categoryFilter.id === cat.id ? (
                      <Icon type="check" style={{ width: 22, height: 22 }} textStyle={{ color: "teal", fontSize: 14 }} />
                    ) : (
                      <Icon style={{ width: 22, height: 22 }} textStyle={{ color: "teal", fontSize: 14 }} />
                    )}
                  </View>
                  <Copy style={{ fontSize: 14 }}>{cat.name}</Copy>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Copy>Labels</Copy>
            <View style={{ padding: 10 }}>
              {labels.map((item) => {
                const labelFilterApplied = appliedLabelsFilter.find(labelFilter => labelFilter.id === item.id)
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      labelFilterApplied ? removeLabelFilter(item) : applyLabelFilter(item)
                    }}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 5 }}>
                      <View style={{ borderWidth: 2, borderColor: "teal", borderRadius: 5 }}>
                        {labelFilterApplied ? (
                          <Icon type="check" style={{ width: 22, height: 22 }} textStyle={{ color: "teal", fontSize: 14 }} />
                        ) : (
                          <Icon style={{ width: 22, height: 22 }} textStyle={{ color: "teal" }} />
                        )}
                      </View>

                      <View style={{ padding: 5, backgroundColor: item.color, margin: 5, borderRadius: 5 }}>
                        <Copy style={{ color: "white", fontSize: 12 }}>{item.name}</Copy>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          <PrimaryButton
            onPress={() => {
              resetFilters()
              navigation.closeDrawer()
            }}
            label="Clear"
            style={{ borderRadius: 20, alignItems: "center" }}
          />
        </View>
      </DrawerContentScrollView>
    )
  }
