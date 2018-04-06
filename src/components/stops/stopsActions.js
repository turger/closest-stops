import { SET_STOPS, SET_LOADING } from './stopsActionTypes'

export const setStops = stops => ({
  stops,
  type: SET_STOPS
})

export const setLoading = loading => ({
  loading,
  type: SET_LOADING 
})
