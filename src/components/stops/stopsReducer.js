import { SET_STOPS } from './stopsActionTypes'
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
    default:
      return state
  }
}
