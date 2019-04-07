import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from '../rootReducer'
import { saveState, loadState } from './localStorage'
import _ from 'lodash'

let FIRST_UPDATE = true
const initialState = {}

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(promiseMiddleware))
  )
}

const updateLocalStorage = () => {
  const loadedState = loadState() || { location: { coords: {}, radius: 1000}, favorites: [], hiddenVehicles: [] }
  const location = Object.keys(store.getState().location.coords).length !== 0 
    ? store.getState().location 
    : loadedState.location
  const favorites = store.getState().favorites.routes.length === 0 && FIRST_UPDATE
    ? loadedState.favorites
    : store.getState().favorites.routes
  const hiddenVehicles = FIRST_UPDATE
    ? loadedState.hiddenVehicles
    : store.getState().stops.hiddenVehicles
  if (FIRST_UPDATE) FIRST_UPDATE = false
  saveState({
    'location': location,
    'favorites': favorites,
    'hiddenVehicles': hiddenVehicles
  })
}

const store = configureStore()

store.subscribe(_.throttle(() => {
  updateLocalStorage()
}, 1000))

export default store