import { SET_COORDS, SET_RADIUS, MANUAL_LOCATION_INPUT, LOCATION_DENIED } from './locationActionTypes'

export const setCoords = coords => ({
  coords,
  type: SET_COORDS
})

export const setRadius = radius => ({
  radius,
  type: SET_RADIUS
})

export const setManualLocationInput = manualLocationInput => ({
  manualLocationInput,
  type: MANUAL_LOCATION_INPUT
})

export const setLocationDenied = locationDenied => ({
  locationDenied,
  type: LOCATION_DENIED
})
