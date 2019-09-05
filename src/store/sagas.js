import { all } from "redux-saga/effects"
import transactions from "./transactions/saga"

export default function* rootSaga() {
  yield all([
    transactions(),
  ])
}
