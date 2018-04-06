import { SET_STOPS, SET_LOADING } from './stopsActionTypes'
import { mapStop } from '../../utils/formatUtils'

const initialState = {
  data: {},
}

export default function stops(state = initialState, action) {
  switch (action.type) {
    case SET_STOPS:
      return {
        ...state,
        data: action.stops.reduce((accumulator, stop) => ({
          ...accumulator,
          [stop.node.stop.gtfsId]: mapStop(stop)}), {})
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state
  }
}
