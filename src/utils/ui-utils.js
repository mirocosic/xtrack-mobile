import { isIphoneX } from "react-native-iphone-x-helper"
import { isIos } from "./os-utils"
import { useSelector } from "react-redux"
import { useColorScheme } from "react-native"

export const safePaddingTop = (offset = 0) => {
  if (isIphoneX()) { return 34 + offset }
  if (isIos) { return 20 + offset }
  return 0 + offset
}
export const safePaddingBottom = (offset = 0) => (isIphoneX() ? 34 : 0) + offset
export const HEADER_MAX_HEIGHT = 150;
export const HEADER_MIN_HEIGHT = 80;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// returns the theme used ('light'|'dark') that is read either from system or app state 
export const useTheme = () => {
  const theme = useSelector(state => state.common.theme)
  const systemTheme = useColorScheme()
  return theme === "system" ? systemTheme : theme
}

// returns 'true' if dark theme is selected on system or in app
export const useDarkTheme = () => {
  const theme = useSelector(state => state.common.theme)
  const systemTheme = useColorScheme()
  return theme === "system" ? systemTheme === "dark" : theme === "dark"
}