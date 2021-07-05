import React, {useEffect, useRef, useState} from "react"
import { useWindowDimensions, Animated } from "react-native"
import SplashScreen from "react-native-splash-screen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"

import Screen from "../../components/screen"
import logo from "../../../assets/images/logo-white.png"

const Splash = ({navigation}) => {

  const window = useWindowDimensions()
  const opacity = useRef(new Animated.Value(0)).current 
  const [animationDone, setAnimationDone] = useState(false)
  const [navigationTarget, setNavigationTarget] = useState(false)
  const fadeInLogo = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start(() => setAnimationDone(true))
  }

  useEffect(() => {
    SplashScreen.hide()
    fadeInLogo()
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

export default Splash
