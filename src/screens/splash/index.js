import React, {useEffect, useRef, useState} from "react"
import { connect } from "react-redux"
import { useWindowDimensions, Animated, Appearance, StatusBar } from "react-native"
import SplashScreen from "react-native-splash-screen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import palette from "../../utils/palette"
import { isAndroid } from "../../utils/os-utils"
import Screen from "../../components/screen"
import logo from "../../../assets/images/logo-white.png"


// set initial status bar style based on app and system settings
const setStatusBarStyle = (theme) => {
  const systemTheme = Appearance.getColorScheme()

  if (theme !== "system") {
    if (theme === "dark") {
      StatusBar.setBarStyle("light-content", true)
      isAndroid && StatusBar.setBackgroundColor(palette.darkGreyHex, true)
      changeNavigationBarColor(palette.darkGreyHex)
    } else {
      StatusBar.setBarStyle("dark-content", true)
      isAndroid && StatusBar.setBackgroundColor(palette.light, true)
      changeNavigationBarColor(palette.light)
    }
  } else {
    if (systemTheme === "dark") {
      StatusBar.setBarStyle("light-content", true)
      isAndroid && StatusBar.setBackgroundColor(palette.darkGreyHex, true)
      changeNavigationBarColor(palette.darkGreyHex)
    } else {
      StatusBar.setBarStyle("dark-content", true)
      isAndroid && StatusBar.setBackgroundColor(palette.light, true)
      changeNavigationBarColor(palette.light)
    }
  }
}

const Splash = ({navigation, theme}) => {

  const window = useWindowDimensions()
  const opacity = useRef(new Animated.Value(0)).current 
  const [animationDone, setAnimationDone] = useState(false)
  const [navigationTarget, setNavigationTarget] = useState(false)

  const fadeInLogo = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => setAnimationDone(true))
  }

  useEffect(() => {
    SplashScreen.hide()
    fadeInLogo()
    setStatusBarStyle(theme)
  }, [])

  useEffect(() => {
    const getAsyncData = async () => {
      const onboardingIsDone = await AsyncStorage.getItem("@onboarding-done")
      if (onboardingIsDone) {
       setNavigationTarget("Main")
      } else {
       setNavigationTarget("Onboarding")
      }
    }
    getAsyncData()
  }, [])

  useEffect(() => {
    if (animationDone && navigationTarget) {
      navigation.navigate(navigationTarget)
    }
  }, [animationDone, navigationTarget])

  return (
    <Screen style={{alignItems: "center", justifyContent: "center"}}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["#2292f4", "#2031f4"]} style={[{ height: window.height, width: window.width }]}/>
      <Animated.Image source={logo} 
            style={{position:"absolute", width: 150, height: 150, opacity}}
      />
    </Screen>
  )
}

export default connect(
  (state) => ({
    theme: state.common.theme
  }),
  null
)(Splash)
