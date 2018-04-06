import { combineReducers } from 'redux'
import stops from './components/stops/stopsReducer'
import location from './components/location/locationReducer'

const rootReducer = combineReducers({
  stops,
  location
})

export default rootReducer
