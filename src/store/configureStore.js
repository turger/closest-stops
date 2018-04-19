import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from '../rootReducer'
import { saveState, loadState } from './localStorage'
import _ from 'lodash'

const configureStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(promiseMiddleware)
  )
}

const updateLocalStorage = () => {
  const loadedState = loadState() || { location: { coords: {}, radius: 1000}, favorites: [] }
  const location = Object.keys(store.getState().location.coords).length !== 0 
    ? store.getState().location 
    : loadedState.location
  const favorites = store.getState().favorites.routes.length !== 0
    ? store.getState().favorites.routes
    : loadedState.favorites
  saveState({
    'location': location,
    'favorites': favorites
  })
}

const store = configureStore()

store.subscribe(_.throttle(() => {
  updateLocalStorage()
}, 1000))

export default store