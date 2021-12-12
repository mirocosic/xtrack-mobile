// import { delay } from "redux-saga"
import { all, takeEvery, takeLatest, put, call, select, delay } from "redux-saga/effects"
import * as RNLocalize from "react-native-localize" // todo: remove this lib, we use Expo package now


function* initApp() {
  console.log("app started...")
}

function* setLanguage() {
}

export default function* commonSaga() {
  yield all([
    initApp(),
  ])
}
