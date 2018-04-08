import { SET_COORDS, SET_RADIUS, MANUAL_LOCATION_INPUT, LOCATION_DENIED } from './locationActionTypes'

const initialState = {
  radius: 1000
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
    case LOCATION_DENIED:
      return {
        ...state,
        locationDenied: action.locationDenied
      }
    default:
      return state
  }
}
