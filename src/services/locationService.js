import { getCurrentGeolocation } from './geolocationService'
import { useAppStore } from '../hooks/useAppStore'

export const manualUpdateCurrentLocation = async () => {
  try {
    const location = await getCurrentGeolocation()
    const state = useAppStore.getState()
    state.setCoords(location)
    return location
  } catch (error) {
    console.error('Error getting location:', error)
    throw error
  }
}