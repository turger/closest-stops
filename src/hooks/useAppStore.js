import _ from 'lodash'
import { create } from 'zustand'
import { mapStop } from '../utils/formatUtils'
import { saveLocalStorage } from '../store/localStorage'

const initialState = {
  location: {
    radius: 1000,
    coords: {lat: 60.17139759724351, lon: 24.941557707652542}
  },
  loading: false,
  stopsData: {
    stops: {},
    hiddenVehicles: []
  },
  favoriteRoutes: [],
  routes: {
    stopTimes: {},
    distance: 0,
    name: '',
    id: '',
    desc: '',
    directions: [],
    platform: '',
    lat: 0,
    lon: 0
  },
  activePath: undefined
};

export const useAppStore = create((set, get) => ({
  ...initialState,
  // TODO: is this necessary?
  setCoords: (coords) => {
    const state = get()
    const updatedLocation = {
      ...state.location,
      coords
    }

    set({location: updatedLocation})
  },
  setRadius: (radius) => {
    const state = get()
    const updatedLocation = {
      ...state.location,
      radius
    }

    saveLocalStorage({
      location: updatedLocation,
      favorites: state.favoriteRoutes,
      hiddenVehicles: state.stopsData.hiddenVehicles
    })

    set({location: updatedLocation})
  },
  setManualLocationInput: (manualLocationInput) => {
    const state = get()
    const updatedLocation = {
      ...state.location,
      manualLocationInput
    }

    saveLocalStorage({
      location: updatedLocation,
      favorites: state.favoriteRoutes,
      hiddenVehicles: state.stopsData.hiddenVehicles
    })

    set({location: updatedLocation})
  },
  setLocationDenied: (locationDenied) => {
    const state = get()
    const updatedLocation = {
      ...state.location,
      locationDenied
    }

    saveLocalStorage({
      location: updatedLocation,
      favorites: state.favoriteRoutes,
      hiddenVehicles: state.stopsData.hiddenVehicles
    })

    set({location: updatedLocation})
  },
  setStopsData: (stops) => {
    const state = get()
    const filteredStops = stops.filter(stop => stop.node.stop.stoptimesWithoutPatterns.length !== 0)
    const updatedStops = {
      ...state.stopsData,
      stops: filteredStops.reduce((accumulator, stop) => ({
        ...accumulator,
        [stop.node.stop.gtfsId]: mapStop(stop)
      }), {})
    }

    set({stopsData: updatedStops})
  },
  setLoading: (loading) => {
    set({loading})
  },
  setHiddenVehicles: (hiddenVehicles) => {
    const state = get()
    const updatedStops = {
      ...state.stopsData,
      hiddenVehicles
    }

    saveLocalStorage({
      location: state.location,
      favorites: state.favoriteRoutes,
      hiddenVehicles: hiddenVehicles
    })

    set({stopsData: updatedStops})
  },
  addFavoriteRoute: (route) => {
    const state = get()
    const updatedFavorites = [...state.favoriteRoutes, route]

    saveLocalStorage({
      location: state.location,
      favorites: updatedFavorites,
      hiddenVehicles: state.stopsData.hiddenVehicles
    })

    set({favoriteRoutes: updatedFavorites})
  },
  removeFavoriteRoute: (route) => {
    const state = get()
    const updatedFavorites = state.favoriteRoutes.filter(r => r !== route)
    
    saveLocalStorage({
      location: state.location,
      favorites: updatedFavorites,
      hiddenVehicles: state.stopsData.hiddenVehicles
    })

    set({favoriteRoutes: updatedFavorites})
  },
  setFavoriteRoutes: (routes) => {
    const updatedFavorites = routes !== '' ? routes.split(',') : []

    set({favoriteRoutes: updatedFavorites})
  },
  setRouteDetails: (details) => {
    const state = get()
    const updatedRoutes = {
      ...state.routes,
      ...details
    }
    set({routes: updatedRoutes})
  },
  setActivePath: (path) => {
    set({activePath: path})
  }
}))
 