import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork, all } from "redux-saga/effects";
import expenses from "./expenses/reducer";
import expensesSaga from "./expenses/saga";

const sagas = [expensesSaga];

function* rootSaga() {
  yield all(sagas.map(fork));
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export const rootReducer = combineReducers({
  expenses
});

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
