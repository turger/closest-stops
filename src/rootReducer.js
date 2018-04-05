import { combineReducers } from 'redux'
import stops from './components/stops/stopsReducer'

const rootReducer = combineReducers({
  stops
})

export default rootReducer
