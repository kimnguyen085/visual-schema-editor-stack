import * as reduxModule from "redux";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import app from "./reducers/app.reducers";
import thunk from "redux-thunk";

/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

const composeEnhancers =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const createReducer = combineReducers({
    app
});

const store = createStore(createReducer, enhancer);

export default store;
