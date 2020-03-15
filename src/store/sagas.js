import { all } from "redux-saga/effects"
import transactions from "./transactions/saga"
import common from "./common/saga"

export default function* rootSaga() {
  yield all([
    common(),
    transactions(),
  ])
}
