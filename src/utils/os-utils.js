import { Platform } from "react-native"

const OS_ANDROID = "android"
const OS_IOS = "ios"

function is(osName) {
  return osName === Platform.OS;
}

const isAndroid = is(OS_ANDROID)
const isIos = is(OS_IOS)

function pickComponent(osComponents) {

  const Component = osComponents[Platform.OS]

  if (!Component) {
    throw new Error(`No component provided for OS: ${Platform.OS}`)
  }

  return Component
}

function getExtension(path) {
  if (!path) throw new Error("getExtension: expected a String")
  const [extension] = path.toLowerCase().split(".")
  return extension
}

export {
  OS_ANDROID,
  OS_IOS,
  isAndroid,
  isIos,
  pickComponent,
  getExtension,
};
