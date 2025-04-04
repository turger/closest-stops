import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import logo from '../assets/logo.svg'
import Warning from './Warning'
import HeaderFilterMenu from './HeaderFilterMenu'
import { useAppStore } from '../hooks/useAppStore'
import { loadLocalStorage } from '../store/localStorage'
import './Header.css'
import { getStopsAndSchedulesByLocation } from '../services/hslApi'
import { updateCurrentGeoLocation } from '../services/locationService'

const Header = () => {
  const state = useAppStore.getState()

  const location = useAppStore(state => state.location)
  const setFavoriteRoutes = useAppStore(state => state.setFavoriteRoutes)
  const setHiddenVehicles = useAppStore(state => state.setHiddenVehicles)
  const setLoading = useAppStore(state => state.setLoading)
  const setStopsData = useAppStore(state => state.setStopsData)

  const [showWarning, setShowWarning] = useState(true)
  const [previousLocation, setPreviousLocation] = useState(location)

  useEffect(() => {
    const localStorage = loadLocalStorage()
    if (localStorage) {
      setLoading(true)
      setFavoriteRoutes(localStorage.favorites.toString())
      setHiddenVehicles(localStorage.hiddenVehicles)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (previousLocation.coords.lat !== location.coords.lat || previousLocation.coords.lon !== location.coords.lon) {
      setPreviousLocation({...location, coords: {lat: location.coords.lat, lon: 24.9277357}})
      getStopsData(location.coords)
    }
  }, [location.coords])

  const getUpdatedLocation = async () => {
    const permissions = await navigator.permissions.query({ name: 'geolocation' })

    if (!permissions.state || permissions.state === 'denied') {
      state.setLocationDenied(true)
      setLoading(false)
      return
    }

    state.setLocationDenied(false)

    return await updateCurrentGeoLocation()
  }


  useEffect(() => {
    getUpdatedLocation()

    const getLocationAndStops = async () => {
      const updatedLocation = await getUpdatedLocation()
      getStopsData(updatedLocation.coords)
    }

    const oneMin = 60000
    const interval = setInterval(() => {
      getLocationAndStops()
    }, oneMin)

    return () => clearInterval(interval)
  }, [])

  const getStopsData = async (updatedCoords) => {
    setLoading(true)

    if (!_.get(updatedCoords, 'lat')) {
      setLoading(false)
      return
    }
    
    const stopsDataRaw = await getStopsAndSchedulesByLocation(
      updatedCoords.lat,
      updatedCoords.lon,
      location.radius
    )
    setLoading(false)
    setStopsData(stopsDataRaw)
  }

  return (
    <div className="Header">
      {location.locationDenied && (
        <Warning
          message="Enable geolocation in your browser if you want to find stops using your current location."
          handleClick={() => setShowWarning(!showWarning)}
          showWarning={showWarning}
        />
      )}
      
      <img src={logo} className="Header-logo" alt="logo" />
      <h1 className="Header-title">Closest stops</h1>
      <HeaderFilterMenu />
    </div>
  )
}

export default Header