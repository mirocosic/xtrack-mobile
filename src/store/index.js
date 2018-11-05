import { createStore, combineReducers, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

import common from './common/reducer';
import transactions from './transactions/reducer';
import categories from './categories/reducer';

const reducers = combineReducers({
  common,
  transactions,
  categories
})

const pReducer = persistReducer(persistConfig, reducers);

//export default createStore(reducers);
export const store = createStore(pReducer);
export const persistor = persistStore(store);
