import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App'; 

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}> {/* Usa el Provider para proporcionar el store */}
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

renderApp();
store.subscribe(renderApp);
