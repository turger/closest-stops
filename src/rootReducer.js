import { combineReducers } from 'redux'
import stops from './components/stops/stopsReducer'
import location from './components/location/locationReducer'
import favorites from './components/favorites/favoritesReducer'

const rootReducer = combineReducers({
  stops,
  location,
  favorites
})

export default rootReducer
