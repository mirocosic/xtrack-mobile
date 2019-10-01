import { delay } from "redux-saga"
import { all, takeEvery, takeLatest, put, call, select } from "redux-saga/effects"
import { last } from "lodash"
import moment from "moment"

// function* initApp() {}

function* addRecurringTransaction() {
  yield takeLatest("ADD_RECURRING_TRANSACTION", function* (action) {

    const frequency = action.options.frequency ? action.options.frequency.toLowerCase() : "month"

    const lastTransaction = yield select(state => last(state.transactions.entries))
    let timestamp = moment(lastTransaction.timestamp)

    do {
      const modTimestamp = parseInt(timestamp.add(1, frequency).format("x"))

      yield put({
        type: "ADD_TRANSACTION",
        transaction: {
          ...lastTransaction,
          parentTransactionId: lastTransaction.id,
          timestamp: modTimestamp,
        }
      })
    } while (action.options.endTimestamp >= timestamp)


  })
}

export default function* commonSaga() {
  yield all([
    addRecurringTransaction(),
  ])
}
