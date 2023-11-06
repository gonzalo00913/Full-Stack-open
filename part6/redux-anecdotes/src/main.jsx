import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'

const rootReducer = combineReducers({
  anecdotes: reducer,
  filter: filterReducer,
});

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)