import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AsyncStorage } from "@react-native-community/async-storage"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";


import common from "./common/reducer";
import transactions from "./transactions/reducer";
import categories from "./categories/reducer";
import accounts from "./accounts/reducer";
import labels from "./labels/reducer";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const reducers = combineReducers({
  common,
  transactions,
  categories,
  accounts,
  labels,
})

const pReducer = persistReducer(persistConfig, reducers);

// export default createStore(reducers);
export const store = createStore(pReducer);
export const persistor = persistStore(store);
