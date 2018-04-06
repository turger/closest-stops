import { SET_COORDS, SET_RADIUS, MANUAL_LOCATION_INPUT } from './locationActionTypes'

const initialState = {
}

export default function location(state = initialState, action) {
  switch (action.type) {
    case SET_COORDS:
      return {
        ...state,
        coords: action.coords
      }
    case SET_RADIUS:
      return {
        ...state,
        radius: action.radius
      }
    case MANUAL_LOCATION_INPUT:
      return {
        ...state,
        manualLocationInput: action.manualLocationInput
      }
    default:
      return state
  }
}
