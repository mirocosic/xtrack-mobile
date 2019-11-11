import { isIphoneX } from "react-native-iphone-x-helper";
import { isIos } from "./os-utils"

export const safePaddingTop = (offset = 0) => (isIphoneX() ? 34 : isIos ? 20 : 0) + offset
export const safePaddingBottom = (offset = 0) => (isIphoneX() ? 34 : 0) + offset
export const HEADER_MAX_HEIGHT = 150;
export const HEADER_MIN_HEIGHT = 80;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
