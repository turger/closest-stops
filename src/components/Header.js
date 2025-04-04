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
    getStopsData()

    const oneMin = 60000
    const interval = setInterval(() => {
      getStopsData()
    }, oneMin)

    return () => clearInterval(interval)
  }, [])

  const getStopsData = async () => {
    setLoading(true)
    const permissions = await navigator.permissions.query({ name: 'geolocation' })

    if (!permissions.state || permissions.state === 'denied') {
      state.setLocationDenied(true)
      setLoading(false)
      return
    }

    state.setLocationDenied(false)

    const updatedLocation = await updateCurrentGeoLocation()

    if (!_.get(updatedLocation, 'lat')) return
    
    const stopsDataRaw = await getStopsAndSchedulesByLocation(
      updatedLocation.lat,
      updatedLocation.lon,
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