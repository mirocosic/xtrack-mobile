import { createStore, combineReducers, applyMiddleware } from 'redux';

import common from './common/reducer';
import transactions from './transactions/reducer';
import categories from './categories/reducer';

const reducers = combineReducers({
  common,
  transactions,
  categories
})

export default createStore(reducers);
