import { SET_STOPS, SET_LOADING, SET_HIDDEN_VEHICLES } from './stopsActionTypes'

export const setStops = stops => ({
  stops,
  type: SET_STOPS
})

export const setLoading = loading => ({
  loading,
  type: SET_LOADING 
})

export const setHiddenVehicles = hiddenVehicles => ({
  hiddenVehicles,
  type: SET_HIDDEN_VEHICLES
})
