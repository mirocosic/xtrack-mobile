// import { delay } from "redux-saga"
import { all, takeEvery, takeLatest, put, call, select, delay } from "redux-saga/effects"
import * as RNLocalize from "react-native-localize"

function* initApp() {
  const { languageCode } = RNLocalize.getLocales()[0]
  yield put({ type: "SET_LANGUAGE", language: { code: languageCode, name: "Hrvatski" } })
}

function* setLanguage() {
  yield takeLatest("SWITCH_LANGUAGE", function* (action) {
    yield put({ type: "SET_LANGUAGE", language: action.language })
  })
}

export default function* commonSaga() {
  yield all([
    initApp(),
    setLanguage(),
  ])
}
