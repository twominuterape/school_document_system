import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import { createStore, applyMiddleware,combineReducers } from 'redux';
import rootReducer from './components/reducers/combinereducer'
import storage from 'redux-persist/lib/storage'
import { createMigrate, persistStore, persistReducer,persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { composeWithDevTools } from '@redux-devtools/extension';
import logger, { createLogger } from 'redux-logger';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import PersistedStore from './components/reducers/persistedStore'

const migrations = {
  0: (state) => {
      return {
       ...state,
      }
  }
}
const persistConfig = {
  key: 'primary',
  version: 0,
  storage,
  debug: true,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: true }),
}
const finalReducer = persistReducer(persistConfig, rootReducer)

const devTools =
    process.env.NODE_ENV === "production"
        ? applyMiddleware(thunk)
        : composeWithDevTools(applyMiddleware(thunk));
// const store = createStore(
//     finalReducer,
//     devTools,

// );
// const middleware = applyMiddleware(thunk, logger);
const store = createStore(finalReducer, devTools);
const persistore = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
            <App />
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
