import { isIphoneX } from "react-native-iphone-x-helper";
import { Dimensions } from "react-native"

export const safePaddingTop = (offset = 0) => (isIphoneX() ? 34 : 20) + offset;
export const HEADER_MAX_HEIGHT = 150;
export const HEADER_MIN_HEIGHT = 80;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
