import { setCoords, setManualLocationInput, setLocationDenied } from '../components/location/locationActions'
import { setLoading } from '../components/stops/stopsActions'
import store from '../store/configureStore'

export const testing = () => { // set some default location for testing
  if (window.location.host.includes('localhost')) {
    setLocation(60.168946, 24.929691)
  }
}

export const manualUpdateCurrentLocation = () => {
  console.log('Manual click to locate user')
  store.dispatch(setManualLocationInput(false))
  getCurrentGeolocation()
}

export const getCurrentGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
      console.warn('Cannot get geolocation')
      store.dispatch(setLocationDenied(true))
      store.dispatch(setLoading(false))
    }
  }

const onError = (e) => {
  console.warn('Error', e)
  store.dispatch(setLocationDenied(true))
  store.dispatch(setLoading(false))
}

const onSuccess = (position) => {
  if (position) {
    if (!store.getState().location.manualLocationInput) {
      setLocation(position.coords.latitude, position.coords.longitude)
      store.dispatch(setLocationDenied(false))
    } else {
      console.log('Already has manually inputted address')
    }
  } else {
    console.warn('No position')
    store.dispatch(setLocationDenied(true))
    store.dispatch(setLoading(false))
  }
}

export const setLocation = (lat, lon) => {
  store.dispatch(setCoords({lat, lon}))
}