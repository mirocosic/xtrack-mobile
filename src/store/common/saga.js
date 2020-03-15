import { delay } from "redux-saga"
import { all, takeEvery, takeLatest, put, call, select } from "redux-saga/effects"

function* setLanguage() {
  yield takeLatest("SWITCH_LANGUAGE", function* (action) {
    yield put({ type: "SET_LANGUAGE", language: action.language })
  })
}

export default function* commonSaga() {
  yield all([
    setLanguage(),
  ])
}
