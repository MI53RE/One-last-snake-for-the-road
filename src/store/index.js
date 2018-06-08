import { combineReducers, createStore } from 'redux'
import options from 'store/ducks/options'
import inputs from 'store/ducks/inputs'

const reducer = combineReducers({
  options: options,
  inputs: inputs,
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
