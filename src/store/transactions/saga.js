import { delay } from "redux-saga"
import { all, takeEvery, takeLatest, put, call, select} from "redux-saga/effects"
import { last } from "lodash"
import moment from "moment"

// function* initApp() {}

function* addRecurringTransaction() {
  yield takeLatest("ADD_RECURRING_TRANSACTION", function*(action) {

    const lastTransaction = yield select(state => last(state.transactions.entries))
    let timestamp = moment(lastTransaction.timestamp)



    for (let i=0; i<5; i++) {

      const modTimestamp = parseInt(timestamp.add(1, "month").format("x"))

      yield put({
        type: "ADD_TRANSACTION",
        transaction: {
          ...lastTransaction,
          parentTransactionId: lastTransaction.id,
          timestamp: modTimestamp
        }
      })
    }


  })
}

export default function* commonSaga() {
  yield all([
    addRecurringTransaction(),
  ])
}
