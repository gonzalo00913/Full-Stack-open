import React from "react";
import ReactDOM from "react-dom";
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import App from "./App";


import filterReducer from './reducers/filterReducer'

import noteReducer from "./reducers/noteReducer";


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})



console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)