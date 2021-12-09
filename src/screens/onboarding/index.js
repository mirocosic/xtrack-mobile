import React, { useRef, useEffect } from "react"
import { View, Text, ScrollView, Dimensions, Animated, StyleSheet, TouchableOpacity } from "react-native"
import LottieView from "lottie-react-native"
import { RectButton } from "react-native-gesture-handler"
import SplashScreen from "react-native-splash-screen"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Screen from "../../components/screen"
import { Copy } from "../../components"
import __ from "../../utils/translations"

const { width } = Dimensions.get("window")

const screens = [1, 2, 3]

const Backdrop = ({ scrollX }) => {
  const bg = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: ["rgb(7, 16,145)", "rgb(13,61,251)", "rgb(39,223,252)"],
  })

  return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bg }]} />
}

const Onboarding = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current

  const opacity1 = scrollX.interpolate({
    inputRange: [-width * 0.5, 0, width * 0.5],
    outputRange: [0, 1, 0],
  })

  const trans1 = scrollX.interpolate({
    inputRange: [-width * 0.5, 0, width * 0.5],
    outputRange: [100, 0, -100],
  })

  const opacity2 = scrollX.interpolate({
    inputRange: [width * 0.5, width, width * 1.5],
    outputRange: [0, 1, 0],
  })

  const trans2 = scrollX.interpolate({
    inputRange: [width * 0.5, width, width * 1.5],
    outputRange: [100, 0, -100],
  })

  const opacity3 = scrollX.interpolate({
    inputRange: [width * 1.5, width * 2, width * 2.5],
    outputRange: [0, 1, 0],
  })

  const opacityBtn = scrollX.interpolate({
    inputRange: [width * 1.8, width * 2],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  const trans3 = scrollX.interpolate({
    inputRange: [width * 1.5, width * 2, width * 2.5],
    outputRange: [100, 0, -100],
  })

  const positionY = scrollX.interpolate({
    inputRange: [width * 1.8, width * 2],
    outputRange: [100, 0],
    extrapolate: "clamp",
  })

  useEffect(() => {setTimeout(() => SplashScreen.hide(), 600), []})

  return (
    
    <Screen>
      <Backdrop scrollX={scrollX} />

      <View style={{ alignItems: "center", justifyContent: "center", position: "absolute", width, height: "50%" }}>
        <Animated.View style={{ width: 400, height: 400, position: "absolute", opacity: opacity1 }}>
          <LottieView source={require("../../../assets/animations/money-dollars.json")} autoPlay loop />
        </Animated.View>

        <Animated.View style={{ width: 300, height: 300, position: "absolute", opacity: opacity2 }}>
          <LottieView source={require("../../../assets/animations/security-check.json")} autoPlay loop />
        </Animated.View>

        <Animated.View style={{ width: 300, height: 300, position: "absolute", opacity: opacity3 }}>
          <LottieView source={require("../../../assets/animations/notification-alert.json")} autoPlay loop />
        </Animated.View>
      </View>

      <View style={{ height: "30%", flexDirection: "row", position: "absolute", width, bottom: 0, paddingTop: 40, justifyContent: "center" }}>
        {screens.map((screenIdx) => {
          const opacity = scrollX.interpolate({
            inputRange: [(screenIdx - 2) * width, (screenIdx - 1) * width, width * screenIdx],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          })
          const scale = scrollX.interpolate({
            inputRange: [(screenIdx - 2) * width, (screenIdx - 1) * width, width * screenIdx],
            outputRange: [1, 1.3, 1],
            extrapolate: "clamp",
          })
          return (
            <Animated.View
              key={`dot-${screenIdx}`}
              style={{ margin: 5, width: 15, height: 15, backgroundColor: "white", opacity, transform: [{ scale }], borderRadius: 15 }}
            />
          )
        })}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}>
        <View style={{ flex: 1, width, alignItems: "center", justifyContent: "center", padding: 20 }}>
          <View style={{ marginTop: 150 }}>
            <Animated.Text style={{ textAlign: "center", color: "white", fontSize: 30, fontWeight: "800", transform: [{ translateX: trans1 }] }}>
              {__("Become a master of your finances")}
            </Animated.Text>
            <Text style={{ textAlign: "center", marginTop: 20, color: "white", fontSize: 16 }}>
              Do you feel like you have no idea where your money goes? Would you like to know your spending habits?
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, width, alignItems: "center", justifyContent: "center", padding: 20 }}>
          <View style={{ marginTop: 150 }}>
            <Animated.Text style={{ textAlign: "center", color: "white", fontSize: 30, fontWeight: "800", transform: [{ translateX: trans2 }] }}>
              {__("Secure your financial future")}
            </Animated.Text>
            <Text style={{ textAlign: "center", marginTop: 20, color: "white", fontSize: 16 }}>
              Are you afraid of retirement age and not sure that you'll be financialy safe? Take control of your finances and be sure about your financial future! 
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, width, alignItems: "center", justifyContent: "center", padding: 20 }}>
          <View style={{ marginTop: 150 }}>
            <Animated.Text style={{ textAlign: "center", color: "white", fontSize: 30, fontWeight: "800", transform: [{ translateX: trans3 }] }}>
              {__("Track all your expenses in one place")}
            </Animated.Text>
            <Text style={{ textAlign: "center", marginTop: 20, color: "white", fontSize: 16 }}>
              XTrack will enable you to have an in-depth knowledge of your finances at a glance!
            </Text>
          </View>
        </View>
      </ScrollView>

      <Animated.View
        style={{
          position: "absolute",
          width,
          bottom: "10%",
          marginTop: 100,
          alignItems: "center",
          justifyContent: "center",
          opacity: opacityBtn,
          transform: [{ translateY: positionY }],
        }}>
          <View style={{ overflow:"hidden", width: 300, borderColor: "white", borderRadius: 25, height: 50 }}>
          <RectButton
            
            onPress={() => {
              AsyncStorage.setItem("@onboarding-done", "true")
              navigation.navigate("Main")
            }}>
            <View style={{ width: 300, borderColor: "white", borderWidth: 2, borderRadius: 25, height: 50, alignItems: "center", justifyContent: "center" }}>
              <Copy style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Let's go!</Copy>
            </View>
          </RectButton>
          </View>
      </Animated.View>
    </Screen>
  )
}
export default Onboarding
