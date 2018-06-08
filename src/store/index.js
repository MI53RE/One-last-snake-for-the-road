import { combineReducers, createStore } from 'redux'
import options from 'store/ducks/options'

const reducer = combineReducers({
  options: options,
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
